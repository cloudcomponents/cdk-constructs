import {
  Duration,
  RemovalPolicy,
  Stack,
  ResourceEnvironment,
  CfnResource,
  aws_certificatemanager,
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_s3,
} from 'aws-cdk-lib';
import { Construct, IConstruct } from 'constructs';

import { IAuthorization, IStaticSiteAuthorization, ISpaAuthorization } from './authorizations';

export interface CommonDistributionProps {
  /**
   * The origin that you want CloudFront to route requests
   */
  readonly origin?: aws_cloudfront.IOrigin;
  /**
   * The price class that corresponds with the maximum price that you want to pay for CloudFront service.
   * If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
   * If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
   * that has the lowest latency among the edge locations in your price class.
   *
   * @default PriceClass.PRICE_CLASS_100
   */
  readonly priceClass?: aws_cloudfront.PriceClass;

  /**
   * Alternative domain names for this distribution.
   *
   * If you want to use your own domain name, such as www.example.com, instead of the cloudfront.net domain name,
   * you can add an alternate domain name to your distribution. If you attach a certificate to the distribution,
   * you must add (at least one of) the domain names of the certificate to this list.
   *
   * @default - The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
   */
  readonly domainNames?: string[];

  /**
   * A certificate to associate with the distribution. The certificate must be located in N. Virginia (us-east-1).
   *
   * @default - the CloudFront wildcard certificate (*.cloudfront.net) will be used.
   */
  readonly certificate?: aws_certificatemanager.ICertificate;

  /**
   * Any comments you want to include about the distribution.
   *
   * @default - no comment
   */
  readonly comment?: string;

  /**
   * The object that you want CloudFront to request from your origin (for example, index.html)
   * when a viewer requests the root URL for your distribution. If no default object is set, the
   * request goes to the origin's root (e.g., example.com/).
   *
   * @default - index.html
   */
  readonly defaultRootObject?: string;

  /**
   * Enable or disable the distribution.
   *
   * @default true
   */
  readonly enabled?: boolean;

  /**
   * Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.
   *
   * If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses.
   * This allows viewers to submit a second request, for an IPv4 address for your distribution.
   *
   * @default true
   */
  readonly enableIpv6?: boolean;

  /**
   * Enable access logging for the distribution.
   *
   * @default - false, unless `logBucket` is specified.
   */
  readonly enableLogging?: boolean;

  /**
   * The Amazon S3 bucket to store the access logs in.
   *
   * @default - A bucket is created if `enableLogging` is true
   */
  readonly logBucket?: aws_s3.IBucket;

  /**
   * Specifies whether you want CloudFront to include cookies in access logs
   *
   * @default false
   */
  readonly logIncludesCookies?: boolean;

  /**
   * An optional string that you want CloudFront to prefix to the access log filenames for this distribution.
   *
   * @default - no prefix
   */
  readonly logFilePrefix?: string;

  /**
   * Controls the countries in which your content is distributed.
   *
   * @default - No geographic restrictions
   */
  readonly geoRestriction?: aws_cloudfront.GeoRestriction;

  /**
   * Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.
   *
   * For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support server name identification (SNI).
   *
   * @default HttpVersion.HTTP2
   */
  readonly httpVersion?: aws_cloudfront.HttpVersion;

  /**
   * Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.
   *
   * To specify a web ACL created using the latest version of AWS WAF, use the ACL ARN, for example
   * `arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a`.
   * To specify a web ACL created using AWS WAF Classic, use the ACL ID, for example `473e64fd-f30b-4765-81a0-62ad96dd167a`.
   *
   * @see https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html
   * @see https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.
   *
   * @default - No AWS Web Application Firewall web access control list (web ACL).
   */
  readonly webAclId?: string;

  /**
   * The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.
   *
   * CloudFront serves your objects only to browsers or devices that support at
   * least the SSL version that you specify.
   *
   * @default SecurityPolicyProtocol.TLS_V1_2_2019
   */
  readonly minimumProtocolVersion?: aws_cloudfront.SecurityPolicyProtocol;

  /**
   * @default Destroy
   */
  readonly removalPolicy?: RemovalPolicy;
}

export interface BaseDistributionProps extends CommonDistributionProps {
  readonly authorization: IAuthorization;
  readonly errorResponses?: aws_cloudfront.ErrorResponse[];
}

export class BaseDistribution extends Construct implements aws_cloudfront.IDistribution {
  public readonly domainName: string;
  public readonly distributionDomainName: string;
  public readonly distributionId: string;
  public readonly stack: Stack;
  public readonly env: ResourceEnvironment;

  constructor(scope: Construct, id: string, props: BaseDistributionProps) {
    super(scope, id);

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.DESTROY;
    const origin = props.origin ?? this.defaultOrigin(removalPolicy);

    const distribution = new aws_cloudfront.Distribution(this, 'Distribution', {
      enabled: props.enabled ?? true,
      enableIpv6: props.enableIpv6 ?? true,
      comment: props.comment,
      enableLogging: props.enableLogging,
      logBucket: props.logBucket,
      logIncludesCookies: props.logIncludesCookies,
      logFilePrefix: props.logFilePrefix,
      priceClass: props.priceClass ?? aws_cloudfront.PriceClass.PRICE_CLASS_100,
      geoRestriction: props.geoRestriction,
      httpVersion: props.httpVersion ?? aws_cloudfront.HttpVersion.HTTP2,
      webAclId: props.webAclId,
      minimumProtocolVersion: props.minimumProtocolVersion,
      errorResponses: props.errorResponses,
      domainNames: props.domainNames,
      certificate: props.certificate,
      defaultBehavior: this.renderDefaultBehaviour(origin, props.authorization),
      additionalBehaviors: this.renderAdditionalBehaviors(origin, props.authorization),
      defaultRootObject: props.defaultRootObject ?? 'index.html',
    });

    const callbackUrls = props.domainNames?.map((name) => `https://${name}${props.authorization.redirectPaths.signIn}`) ?? [];
    const logoutUrls = props.domainNames?.map((name) => `https://${name}${props.authorization.redirectPaths.signOut}`) ?? [];

    props.authorization.updateUserPoolClientCallbacks({
      callbackUrls: [`https://${distribution.distributionDomainName}${props.authorization.redirectPaths.signIn}`, ...callbackUrls],
      logoutUrls: [`https://${distribution.distributionDomainName}${props.authorization.redirectPaths.signOut}`, ...logoutUrls],
    });

    this.domainName = distribution.domainName;
    this.distributionDomainName = distribution.distributionDomainName;
    this.distributionId = distribution.distributionId;

    this.stack = Stack.of(this);
    this.env = {
      account: this.stack.account,
      region: this.stack.region,
    };
  }

  public applyRemovalPolicy(policy: RemovalPolicy) {
    const child = this.node.defaultChild as IConstruct;
    if (!child || !CfnResource.isCfnResource(child)) {
      throw new Error('Cannot apply RemovalPolicy: no child or not a CfnResource. Apply the removal policy on the CfnResource directly.');
    }
    child.applyRemovalPolicy(policy);
  }

  protected renderDefaultBehaviour(origin: aws_cloudfront.IOrigin, authorization: IAuthorization): aws_cloudfront.BehaviorOptions {
    return authorization.createDefaultBehavior(origin, {
      originRequestPolicy: undefined,
      cachePolicy: aws_cloudfront.CachePolicy.CACHING_DISABLED,
    });
  }

  protected renderAdditionalBehaviors(origin: aws_cloudfront.IOrigin, authorization: IAuthorization): Record<string, aws_cloudfront.BehaviorOptions> {
    return authorization.createAdditionalBehaviors(origin, {
      originRequestPolicy: undefined,
      cachePolicy: aws_cloudfront.CachePolicy.CACHING_DISABLED,
    });
  }

  private defaultOrigin(removalPolicy: RemovalPolicy): aws_cloudfront.IOrigin {
    const bucket = new aws_s3.Bucket(this, 'Bucket', {
      autoDeleteObjects: removalPolicy === RemovalPolicy.DESTROY,
      removalPolicy,
    });

    return new aws_cloudfront_origins.S3Origin(bucket);
  }
}

export interface StaticSiteDistributionProps extends CommonDistributionProps {
  readonly authorization: IStaticSiteAuthorization;
  readonly errorResponses?: aws_cloudfront.ErrorResponse[];
}

export class StaticSiteDistribution extends BaseDistribution {
  constructor(scope: Construct, id: string, props: StaticSiteDistributionProps) {
    super(scope, id, props);
  }
}

export interface SpaDistributionProps extends CommonDistributionProps {
  readonly authorization: ISpaAuthorization;
  /**
   * The minimum amount of time, in seconds, that you want CloudFront
   * to cache the HTTP status code specified in ErrorCode.
   *
   * @default 300 seconds
   */
  readonly ttl?: Duration;
}

export class SpaDistribution extends BaseDistribution {
  constructor(scope: Construct, id: string, props: SpaDistributionProps) {
    super(scope, id, {
      ...props,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          ttl: props.ttl ?? Duration.seconds(300),
          responsePagePath: '/index.html',
        },
      ],
    });
  }
}
