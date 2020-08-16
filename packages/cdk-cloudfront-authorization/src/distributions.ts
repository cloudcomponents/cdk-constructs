import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { IOrigin, Distribution, ErrorResponse, PriceClass, HttpVersion } from '@aws-cdk/aws-cloudfront';
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins';
import { Construct, Duration, RemovalPolicy } from '@aws-cdk/core';
import { DeletableBucket } from '@cloudcomponents/cdk-deletable-bucket';

import { IAuthorization, IStaticSiteAuthorization, ISpaAuthorization } from './authorizations';

export interface CommonDistributionProps {
  /**
   * The origin that you want CloudFront to route requests
   */
  readonly origin?: IOrigin;
  /**
   * The price class that corresponds with the maximum price that you want to pay for CloudFront service.
   * If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
   * If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
   * that has the lowest latency among the edge locations in your price class.
   *
   * @default PriceClass.PRICE_CLASS_100
   */
  readonly priceClass?: PriceClass;

  /**
   * A certificate to associate with the distribution. The certificate must be located in N. Virginia (us-east-1).
   *
   * @default - the CloudFront wildcard certificate (*.cloudfront.net) will be used.
   */
  readonly certificate?: ICertificate;

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
   * Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.
   *
   * For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support server name identification (SNI).
   *
   * @default HttpVersion.HTTP2
   */
  readonly httpVersion?: HttpVersion;

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

  readonly removalPolicy?: RemovalPolicy;
}

export interface BaseDistributionProps extends CommonDistributionProps {
  readonly authorization: IAuthorization;
  readonly errorResponses?: ErrorResponse[];
}

export class BaseDistribution extends Construct {
  constructor(scope: Construct, id: string, props: BaseDistributionProps) {
    super(scope, id);

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.DESTROY;

    const origin = props.origin ?? this.defaultOrigin(removalPolicy === RemovalPolicy.DESTROY);

    const distribution = new Distribution(this, 'Distribution', {
      enabled: props.enabled ?? true,
      enableIpv6: props.enableIpv6 ?? true,
      comment: props.comment,
      priceClass: props.priceClass ?? PriceClass.PRICE_CLASS_100,
      httpVersion: props.httpVersion ?? HttpVersion.HTTP2,
      webAclId: props.webAclId,
      errorResponses: props.errorResponses,
      certificate: props.certificate,
      defaultBehavior: props.authorization.createDefaultBehavior(origin),
      additionalBehaviors: props.authorization.createAdditionalBehaviors(origin),
      defaultRootObject: props.defaultRootObject ?? 'index.html',
    });

    props.authorization.updateUserPoolClientCallbacks({
      callbackUrls: [`https://${distribution.distributionDomainName}${props.authorization.redirectPaths.signIn}`],
      logoutUrls: [`https://${distribution.distributionDomainName}${props.authorization.redirectPaths.signOut}`],
    });
  }

  private defaultOrigin(forceDelete: boolean): IOrigin {
    const bucket = new DeletableBucket(this, 'DeletableBucket', {
      forceDelete,
    });

    return new S3Origin(bucket);
  }
}

export interface StaticSiteDistributionProps extends CommonDistributionProps {
  readonly authorization: IStaticSiteAuthorization;
  readonly errorResponses?: ErrorResponse[];
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
