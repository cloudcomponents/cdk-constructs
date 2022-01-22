import {
  Duration,
  RemovalPolicy,
  Stack,
  aws_certificatemanager,
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_ec2,
  aws_ecs,
  aws_elasticloadbalancingv2,
  aws_iam,
  aws_logs,
  aws_route53,
  aws_s3,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Database } from './database';
import { Dns } from './dns';
import { EfsVolume } from './efs-volume';

export interface ApplicationProps {
  readonly domainName: string;
  readonly domainZone: aws_route53.IHostedZone;
  readonly certificate: aws_certificatemanager.ICertificate;
  readonly vpc: aws_ec2.IVpc;
  readonly volume: EfsVolume;
  readonly database: Database;
  readonly image?: aws_ecs.ContainerImage;
  readonly serviceName?: string;
  readonly memoryLimitMiB?: number;
  readonly environment?: Record<string, string>;
  readonly secrets?: Record<string, aws_ecs.Secret>;
  readonly logDriver?: aws_ecs.LogDriver;
  readonly cloudFrontHashHeader?: string;
  readonly removalPolicy?: RemovalPolicy;
}

const CUSTOM_HTTP_HEADER = 'X_Request_From_CloudFront';

export interface StaticContentOffload {
  readonly domainName: string;
  readonly distribution: aws_cloudfront.IDistribution;
}

export class Application extends Construct {
  public readonly domainName: string;
  public readonly domainZone: aws_route53.IHostedZone;
  public readonly distribution: aws_cloudfront.IDistribution;
  public readonly service: aws_ecs.FargateService;
  public readonly targetGroup: aws_elasticloadbalancingv2.ApplicationTargetGroup;
  public readonly listener: aws_elasticloadbalancingv2.ApplicationListener;

  private readonly cloudFrontHashHeader: string;
  private readonly removalPolicy?: RemovalPolicy;

  constructor(scope: Construct, id: string, props: ApplicationProps) {
    super(scope, id);

    const stack = Stack.of(this);

    this.domainName = props.domainName;
    this.domainZone = props.domainZone;

    this.cloudFrontHashHeader = props.cloudFrontHashHeader ?? Buffer.from(`${stack.stackName}.${this.domainName}`).toString('base64');
    this.removalPolicy = props.removalPolicy;

    const cluster = new aws_ecs.Cluster(this, 'Cluster', {
      containerInsights: true,
      vpc: props.vpc,
    });

    this.targetGroup = new aws_elasticloadbalancingv2.ApplicationTargetGroup(this, 'TargetGroup', {
      vpc: props.vpc,
      port: 80,
      targetType: aws_elasticloadbalancingv2.TargetType.IP,
      stickinessCookieDuration: Duration.days(7),
    });

    this.targetGroup.configureHealthCheck({
      path: '/wp-includes/images/blank.gif',
      interval: Duration.minutes(1),
    });

    const loadBalancer = new aws_elasticloadbalancingv2.ApplicationLoadBalancer(this, 'Loadbalancer', {
      vpc: props.vpc,
      internetFacing: true,
      http2Enabled: true,
    });

    this.listener = loadBalancer.addListener('Listener', {
      port: 443,
      protocol: aws_elasticloadbalancingv2.ApplicationProtocol.HTTPS,
      certificates: [
        aws_elasticloadbalancingv2.ListenerCertificate.fromCertificateManager(
          new aws_certificatemanager.Certificate(this, 'LBCertificate', {
            domainName: this.domainName,
            validation: aws_certificatemanager.CertificateValidation.fromDns(this.domainZone),
          }),
        ),
      ],
      sslPolicy: aws_elasticloadbalancingv2.SslPolicy.FORWARD_SECRECY_TLS12,
      defaultAction: aws_elasticloadbalancingv2.ListenerAction.fixedResponse(403, {
        contentType: 'text/plain',
        messageBody: 'Access denied',
      }),
    });

    this.listener.addAction('Cloudfornt', {
      action: aws_elasticloadbalancingv2.ListenerAction.forward([this.targetGroup]),
      conditions: [aws_elasticloadbalancingv2.ListenerCondition.httpHeader(CUSTOM_HTTP_HEADER, [this.cloudFrontHashHeader])],
      priority: 100,
    });

    const taskDefinition = new aws_ecs.FargateTaskDefinition(this, 'TaskDefinition', {
      memoryLimitMiB: props.memoryLimitMiB ?? 512,
      cpu: 256,
      volumes: [props.volume],
    });

    const container = taskDefinition.addContainer('Wordpress', {
      image: props.image ?? aws_ecs.ContainerImage.fromRegistry('wordpress:5.8-apache'),
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
        aws_ecs.LogDriver.awsLogs({
          streamPrefix: `${stack.stackName}WordpressContainerLog`,
          logRetention: aws_logs.RetentionDays.ONE_MONTH,
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

    this.service = new aws_ecs.FargateService(this, 'Service', {
      cluster,
      serviceName: props.serviceName,
      taskDefinition,
      desiredCount: 2,
    });

    this.service.connections.allowFrom(loadBalancer, aws_ec2.Port.tcp(80));
    this.targetGroup.addTarget(this.service);

    const origin = new aws_cloudfront_origins.LoadBalancerV2Origin(loadBalancer, {
      originSslProtocols: [aws_cloudfront.OriginSslPolicy.TLS_V1_2],
      customHeaders: {
        [CUSTOM_HTTP_HEADER]: this.cloudFrontHashHeader,
      },
      readTimeout: Duration.seconds(60),
      protocolPolicy: aws_cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
    });

    this.distribution = new aws_cloudfront.Distribution(this, 'WorpdressDistribution', {
      comment: 'wordpress cdn',
      defaultBehavior: {
        origin,
        originRequestPolicy: new aws_cloudfront.OriginRequestPolicy(this, 'OriginRequestPolicy', {
          originRequestPolicyName: 'WordpressDefaultBehavior',
          cookieBehavior: aws_cloudfront.OriginRequestCookieBehavior.allowList('comment_*', 'wordpress_*', 'wp-settings-*'),
          headerBehavior: aws_cloudfront.OriginRequestHeaderBehavior.allowList(
            'Host',
            'CloudFront-Forwarded-Proto',
            'CloudFront-Is-Mobile-Viewer',
            'CloudFront-Is-Tablet-Viewer',
            'CloudFront-Is-Desktop-Viewer',
          ),
          queryStringBehavior: aws_cloudfront.OriginRequestQueryStringBehavior.all(),
        }),
        allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_ALL,
        cachedMethods: aws_cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: {
        'wp-admin/*': {
          origin,
          originRequestPolicy: aws_cloudfront.OriginRequestPolicy.ALL_VIEWER,
          allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_ALL,
          cachedMethods: aws_cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        'wp-login.php': {
          origin,
          originRequestPolicy: aws_cloudfront.OriginRequestPolicy.ALL_VIEWER,
          allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_ALL,
          cachedMethods: aws_cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      },
      enableIpv6: true,
      httpVersion: aws_cloudfront.HttpVersion.HTTP2,
      certificate: props.certificate,
      domainNames: [this.domainName],
      priceClass: aws_cloudfront.PriceClass.PRICE_CLASS_100,
    });

    new Dns(this, 'WordpressDns', {
      domainName: this.domainName,
      domainZone: this.domainZone,
      distribution: this.distribution,
    });
  }

  public enableStaticContentOffload(domainName: string, certificate: aws_certificatemanager.ICertificate): StaticContentOffload {
    const bucket = new aws_s3.Bucket(this, 'Bucket', {
      encryption: aws_s3.BucketEncryption.S3_MANAGED,
      versioned: true,
      removalPolicy: this.removalPolicy,
      autoDeleteObjects: this.removalPolicy === RemovalPolicy.DESTROY,
    });

    bucket.grantReadWrite(this.service.taskDefinition.taskRole);

    this.service.taskDefinition.taskRole.addToPrincipalPolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ['s3:GetBucketLocation'],
        resources: [bucket.bucketArn],
      }),
    );

    const distribution = new aws_cloudfront.Distribution(this, 'StaticContentDistribution', {
      comment: 'static content cdn',
      defaultBehavior: {
        origin: new aws_cloudfront_origins.S3Origin(bucket),
        allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: aws_cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      enableIpv6: true,
      httpVersion: aws_cloudfront.HttpVersion.HTTP2,
      certificate,
      domainNames: [domainName],
      priceClass: aws_cloudfront.PriceClass.PRICE_CLASS_100,
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
