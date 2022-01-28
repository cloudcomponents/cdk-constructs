import * as crypto from 'crypto';
import * as path from 'path';
import {
  ArnFormat,
  Stack,
  Token,
  Duration,
  RemovalPolicy,
  aws_certificatemanager,
  aws_cloudfront,
  aws_cloudfront_origins,
  aws_s3,
  aws_s3_deployment,
  aws_route53,
  aws_route53_targets,
} from 'aws-cdk-lib';
import { IHostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export const DefaultSecurityHeadersBehavior: aws_cloudfront.ResponseSecurityHeadersBehavior = {
  contentSecurityPolicy: {
    contentSecurityPolicy:
      "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
    override: true,
  },
  contentTypeOptions: { override: true },
  frameOptions: { frameOption: aws_cloudfront.HeadersFrameOption.DENY, override: true },
  referrerPolicy: { referrerPolicy: aws_cloudfront.HeadersReferrerPolicy.SAME_ORIGIN, override: true },
  strictTransportSecurity: { accessControlMaxAge: Duration.seconds(31536000), includeSubdomains: true, preload: true, override: true },
  xssProtection: { protection: true, modeBlock: true, override: true },
};

export interface StaticWebsiteProps {
  /**
   * Any comments you want to include about the distribution.
   *
   * @default - no comment
   */
  readonly comment?: string;

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
   * The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.
   *
   * CloudFront serves your objects only to browsers or devices that support at
   * least the SSL version that you specify.
   *
   * @default SecurityPolicyProtocol.TLS_V1_2_2021
   */
  readonly minimumProtocolVersion?: aws_cloudfront.SecurityPolicyProtocol;

  /**
   * Hosted zone of the domain which will be used to create alias record(s) from
   * domain names in the hosted zone to the destination.
   *
   * Domain names in the hosted zone can include a specific domain (example.com)
   * and its subdomains (acme.example.com, zenith.example.com).
   *
   */
  readonly hostedZone?: aws_route53.IHostedZone;

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
   * The price class that corresponds with the maximum price that you want to pay for CloudFront service.
   * If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
   * If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
   * that has the lowest latency among the edge locations in your price class.
   *
   * @default PriceClass.PRICE_CLASS_100
   */
  readonly priceClass?: aws_cloudfront.PriceClass;

  /**
   * The Lambda@Edge functions to invoke before serving the contents.
   *
   * @default - no Lambda functions will be invoked
   */
  readonly edgeLambdas?: aws_cloudfront.EdgeLambda[];

  /**
   * A configuration for a set of custom HTTP response headers.
   *
   * @default - no custom headers behavior
   */
  readonly customHeaders?: aws_cloudfront.ResponseCustomHeader[];

  /**
   * Configuration for a set of security-related HTTP response headers.
   *
   * @default - DefaultSecurityHeadersBehavior
   */
  readonly securityHeadersBehavior?: aws_cloudfront.ResponseSecurityHeadersBehavior;

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
   * The object that you want CloudFront to request from your origin (for example, index.html)
   * when a viewer requests the root URL for your distribution. If no default object is set, the
   * request goes to the origin's root (e.g., example.com/).
   *
   * @default - index.html
   */
  readonly defaultRootObject?: string;

  /**
   * How CloudFront should handle requests that are not successful (e.g., PageNotFound).
   *
   * @default - 403 and 404 are routed as 404 to error.html.
   */
  readonly errorResponses?: aws_cloudfront.ErrorResponse[];

  /**
   * The source from which to deploy the website
   *
   * @default - Dummy placeholder
   */
  readonly source?: string;

  /**
   * Disable website deployment
   *
   * @default - false
   */
  readonly disableUpload?: boolean;

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
   * @default Destroy
   */
  readonly removalPolicy?: RemovalPolicy;
}

export class StaticWebsite extends Construct {
  public readonly distribution: aws_cloudfront.Distribution;
  public readonly bucket: aws_s3.Bucket;

  constructor(scope: Construct, id: string, props: StaticWebsiteProps = {}) {
    super(scope, id);

    if (props.certificate) {
      const certificateRegion = Stack.of(this).splitArn(props.certificate.certificateArn, ArnFormat.SLASH_RESOURCE_NAME).region;

      if (!Token.isUnresolved(certificateRegion) && certificateRegion !== 'us-east-1') {
        throw new Error(`The certificate must be in the us-east-1 region and the certificate you provided is in ${certificateRegion}.`);
      }
    }

    const certificate = props.certificate ?? this.createCertificate(props.hostedZone, props.domainNames);
    const enabledIpv6 = props.enableIpv6 ?? true;
    const removalPolicy = props.removalPolicy ?? RemovalPolicy.DESTROY;

    const errorResponses = props.errorResponses ?? [
      {
        httpStatus: 404,
        ttl: Duration.minutes(3),
        responseHttpStatus: 404,
        responsePagePath: '/error.html',
      },
      {
        httpStatus: 403,
        ttl: Duration.minutes(3),
        responseHttpStatus: 404,
        responsePagePath: '/error.html',
      },
    ];

    this.bucket = new aws_s3.Bucket(this, 'Bucket', {
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: removalPolicy === RemovalPolicy.DESTROY,
      removalPolicy,
    });

    this.distribution = new aws_cloudfront.Distribution(this, 'Distribution', {
      comment: props.comment,
      defaultRootObject: props.defaultRootObject ?? 'index.html',
      domainNames: props.domainNames,
      certificate,
      minimumProtocolVersion: props.minimumProtocolVersion ?? aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      enabled: props.enabled ?? true,
      enableIpv6: enabledIpv6,
      errorResponses,
      defaultBehavior: {
        origin: new aws_cloudfront_origins.S3Origin(this.bucket),
        allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        responseHeadersPolicy: this.createResponseHeadersPolicy(props.securityHeadersBehavior, props.customHeaders),
        edgeLambdas: props.edgeLambdas,
      },
      geoRestriction: props.geoRestriction,
      httpVersion: props.httpVersion ?? aws_cloudfront.HttpVersion.HTTP2,
      priceClass: props.priceClass ?? aws_cloudfront.PriceClass.PRICE_CLASS_100,
      enableLogging: props.enableLogging,
      logBucket: props.logBucket,
      logIncludesCookies: props.logIncludesCookies,
      logFilePrefix: props.logFilePrefix,
      webAclId: props.webAclId,
    });

    if (!props.disableUpload) {
      const placeHolderSource = path.join(__dirname, '..', 'website');

      new aws_s3_deployment.BucketDeployment(this, 'Deployment', {
        sources: [aws_s3_deployment.Source.asset(props.source ?? placeHolderSource)],
        destinationBucket: this.bucket,
        distribution: this.distribution,
        distributionPaths: ['/*'],
        retainOnDelete: removalPolicy === RemovalPolicy.RETAIN,
      });
    }

    if (props.hostedZone) {
      props.domainNames?.forEach((domainName) => {
        const hash = crypto.createHash('md5').update(domainName).digest('hex').substring(0, 6);

        new aws_route53.ARecord(this, `WebsiteAliasRecord${hash}`, {
          zone: props.hostedZone as IHostedZone,
          recordName: `${domainName}.`,
          target: aws_route53.RecordTarget.fromAlias(new aws_route53_targets.CloudFrontTarget(this.distribution)),
        });

        if (enabledIpv6) {
          new aws_route53.AaaaRecord(this, `WebsiteIPv6AliasRecord${hash}`, {
            zone: props.hostedZone as IHostedZone,
            recordName: `${domainName}.`,
            target: aws_route53.RecordTarget.fromAlias(new aws_route53_targets.CloudFrontTarget(this.distribution)),
          });
        }
      });
    }
  }

  public addBehaviour(pathPattern: string, origin: aws_cloudfront.IOrigin, behaviorOptions?: aws_cloudfront.AddBehaviorOptions) {
    this.distribution.addBehavior(pathPattern, origin, behaviorOptions);
  }

  protected createResponseHeadersPolicy(
    securityHeadersBehavior?: aws_cloudfront.ResponseSecurityHeadersBehavior,
    customHeaders?: aws_cloudfront.ResponseCustomHeader[],
  ): aws_cloudfront.ResponseHeadersPolicy {
    return new aws_cloudfront.ResponseHeadersPolicy(this, 'ResponseHeadersPolicy', {
      securityHeadersBehavior: securityHeadersBehavior ?? DefaultSecurityHeadersBehavior,
      customHeadersBehavior: {
        customHeaders: customHeaders ?? [
          {
            header: 'Server',
            value: 'Server',
            override: true,
          },
        ],
      },
    });
  }

  private createCertificate(hostedZone?: aws_route53.IHostedZone, domainNames?: string[]): aws_certificatemanager.ICertificate | undefined {
    if (!hostedZone || !domainNames || domainNames.length == 0) return;

    return new aws_certificatemanager.DnsValidatedCertificate(this, 'Certificate', {
      domainName: domainNames[0],
      subjectAlternativeNames: domainNames,
      hostedZone,
      region: 'us-east-1',
    });
  }
}
