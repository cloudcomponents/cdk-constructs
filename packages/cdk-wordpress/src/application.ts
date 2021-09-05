import { CertificateValidation, Certificate, ICertificate } from '@aws-cdk/aws-certificatemanager';
import {
  Distribution,
  OriginProtocolPolicy,
  AllowedMethods,
  CachedMethods,
  ViewerProtocolPolicy,
  HttpVersion,
  PriceClass,
  IDistribution,
  OriginSslPolicy,
  OriginRequestPolicy,
  OriginRequestCookieBehavior,
  OriginRequestHeaderBehavior,
  OriginRequestQueryStringBehavior,
} from '@aws-cdk/aws-cloudfront';
import { LoadBalancerV2Origin, S3Origin } from '@aws-cdk/aws-cloudfront-origins';
import { IVpc, Port } from '@aws-cdk/aws-ec2';
import { Cluster, ContainerImage, FargateService, FargateTaskDefinition, LogDriver, Secret } from '@aws-cdk/aws-ecs';
import {
  ApplicationListener,
  ApplicationLoadBalancer,
  ApplicationProtocol,
  ApplicationTargetGroup,
  ListenerAction,
  ListenerCertificate,
  ListenerCondition,
  SslPolicy,
  TargetType,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { IHostedZone } from '@aws-cdk/aws-route53';
import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import { Construct, Duration, RemovalPolicy, Stack } from '@aws-cdk/core';

import { Database } from './database';
import { Dns } from './dns';
import { EfsVolume } from './efs-volume';

export interface ApplicationProps {
  readonly domainName: string;
  readonly domainZone: IHostedZone;
  readonly certificate: ICertificate;
  readonly vpc: IVpc;
  readonly volume: EfsVolume;
  readonly database: Database;
  readonly image?: ContainerImage;
  readonly serviceName?: string;
  readonly memoryLimitMiB?: number;
  readonly environment?: Record<string, string>;
  readonly secrets?: Record<string, Secret>;
  readonly logDriver?: LogDriver;
  readonly cloudFrontHashHeader?: string;
  readonly removalPolicy?: RemovalPolicy;
}

const CUSTOM_HTTP_HEADER = 'X_Request_From_CloudFront';

export interface StaticContentOffload {
  readonly domainName: string;
  readonly distribution: IDistribution;
}

export class Application extends Construct {
  public readonly domainName: string;
  public readonly domainZone: IHostedZone;
  public readonly distribution: IDistribution;
  public readonly service: FargateService;
  public readonly targetGroup: ApplicationTargetGroup;
  public readonly listener: ApplicationListener;

  private readonly cloudFrontHashHeader: string;
  private readonly removalPolicy?: RemovalPolicy;

  constructor(scope: Construct, id: string, props: ApplicationProps) {
    super(scope, id);

    const stack = Stack.of(this);

    this.domainName = props.domainName;
    this.domainZone = props.domainZone;

    this.cloudFrontHashHeader = props.cloudFrontHashHeader ?? Buffer.from(`${stack.stackName}.${this.domainName}`).toString('base64');
    this.removalPolicy = props.removalPolicy;

    const cluster = new Cluster(this, 'Cluster', {
      containerInsights: true,
      vpc: props.vpc,
    });

    this.targetGroup = new ApplicationTargetGroup(this, 'TargetGroup', {
      vpc: props.vpc,
      port: 80,
      targetType: TargetType.IP,
      stickinessCookieDuration: Duration.days(7),
    });

    this.targetGroup.configureHealthCheck({
      path: '/wp-includes/images/blank.gif',
      interval: Duration.minutes(1),
    });

    const loadBalancer = new ApplicationLoadBalancer(this, 'Loadbalancer', {
      vpc: props.vpc,
      internetFacing: true,
      http2Enabled: true,
    });

    this.listener = loadBalancer.addListener('Listener', {
      port: 443,
      protocol: ApplicationProtocol.HTTPS,
      certificates: [
        ListenerCertificate.fromCertificateManager(
          new Certificate(this, 'LBCertificate', {
            domainName: this.domainName,
            validation: CertificateValidation.fromDns(this.domainZone),
          }),
        ),
      ],
      sslPolicy: SslPolicy.FORWARD_SECRECY_TLS12,
      defaultAction: ListenerAction.fixedResponse(403, {
        contentType: 'text/plain',
        messageBody: 'Access denied',
      }),
    });

    this.listener.addAction('Cloudfornt', {
      action: ListenerAction.forward([this.targetGroup]),
      conditions: [ListenerCondition.httpHeader(CUSTOM_HTTP_HEADER, [this.cloudFrontHashHeader])],
      priority: 100,
    });

    const taskDefinition = new FargateTaskDefinition(this, 'TaskDefinition', {
      memoryLimitMiB: props.memoryLimitMiB ?? 512,
      cpu: 256,
      volumes: [props.volume],
    });

    const container = taskDefinition.addContainer('Wordpress', {
      image: props.image ?? ContainerImage.fromRegistry('wordpress:5.8-apache'),
      environment: {
        ...props.environment,
        ...props.database.environment,
      },
      secrets: {
        ...props.secrets,
        ...props.database.secrets,
      },
      logging:
        props.logDriver ??
        LogDriver.awsLogs({
          streamPrefix: `${stack.stackName}WordpressContainerLog`,
          logRetention: RetentionDays.ONE_MONTH,
        }),
    });

    container.addPortMappings({
      containerPort: 80,
    });

    container.addMountPoints({
      containerPath: '/var/www/html',
      readOnly: false,
      sourceVolume: props.volume.name,
    });

    this.service = new FargateService(this, 'Service', {
      cluster,
      serviceName: props.serviceName,
      taskDefinition,
      desiredCount: 2,
    });

    this.service.connections.allowFrom(loadBalancer, Port.tcp(80));
    this.targetGroup.addTarget(this.service);

    const origin = new LoadBalancerV2Origin(loadBalancer, {
      originSslProtocols: [OriginSslPolicy.TLS_V1_2],
      customHeaders: {
        [CUSTOM_HTTP_HEADER]: this.cloudFrontHashHeader,
      },
      readTimeout: Duration.seconds(60),
      protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
    });

    this.distribution = new Distribution(this, 'WorpdressDistribution', {
      comment: 'wordpress cdn',
      defaultBehavior: {
        origin,
        originRequestPolicy: new OriginRequestPolicy(this, 'OriginRequestPolicy', {
          originRequestPolicyName: 'WordpressDefaultBehavior',
          cookieBehavior: OriginRequestCookieBehavior.allowList('comment_*', 'wordpress_*', 'wp-settings-*'),
          headerBehavior: OriginRequestHeaderBehavior.allowList(
            'Host',
            'CloudFront-Forwarded-Proto',
            'CloudFront-Is-Mobile-Viewer',
            'CloudFront-Is-Tablet-Viewer',
            'CloudFront-Is-Desktop-Viewer',
          ),
          queryStringBehavior: OriginRequestQueryStringBehavior.all(),
        }),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: {
        'wp-admin/*': {
          origin,
          originRequestPolicy: OriginRequestPolicy.ALL_VIEWER,
          allowedMethods: AllowedMethods.ALLOW_ALL,
          cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        'wp-login.php': {
          origin,
          originRequestPolicy: OriginRequestPolicy.ALL_VIEWER,
          allowedMethods: AllowedMethods.ALLOW_ALL,
          cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      },
      enableIpv6: true,
      httpVersion: HttpVersion.HTTP2,
      certificate: props.certificate,
      domainNames: [this.domainName],
      priceClass: PriceClass.PRICE_CLASS_100,
    });

    new Dns(this, 'WordpressDns', {
      domainName: this.domainName,
      domainZone: this.domainZone,
      distribution: this.distribution,
    });
  }

  public enableStaticContentOffload(domainName: string, certificate: ICertificate): StaticContentOffload {
    const bucket = new Bucket(this, 'Bucket', {
      encryption: BucketEncryption.S3_MANAGED,
      versioned: true,
      removalPolicy: this.removalPolicy,
      autoDeleteObjects: this.removalPolicy === RemovalPolicy.DESTROY,
    });

    bucket.grantReadWrite(this.service.taskDefinition.taskRole);

    this.service.taskDefinition.taskRole.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetBucketLocation'],
        resources: [bucket.bucketArn],
      }),
    );

    const distribution = new Distribution(this, 'StaticContentDistribution', {
      comment: 'static content cdn',
      defaultBehavior: {
        origin: new S3Origin(bucket),
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      enableIpv6: true,
      httpVersion: HttpVersion.HTTP2,
      certificate,
      domainNames: [domainName],
      priceClass: PriceClass.PRICE_CLASS_100,
    });

    new Dns(this, 'StaticContentDns', {
      domainName: domainName,
      domainZone: this.domainZone,
      distribution,
    });

    return {
      domainName,
      distribution,
    };
  }
}
