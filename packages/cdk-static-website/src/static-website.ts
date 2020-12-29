import {
  AliasConfiguration,
  CloudFrontWebDistribution,
  CloudFrontWebDistributionProps,
  LambdaFunctionAssociation,
  CfnDistribution,
} from '@aws-cdk/aws-cloudfront';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { Construct } from '@aws-cdk/core';

import { WebsiteAliasRecord } from './website-alias-record';
import { WebsiteBucket, WebsiteBucketProps } from './website-bucket';

export interface AliasProps extends AliasConfiguration {
  /** The domain name for the site like 'example.com' */
  readonly domainName: string;

  /**
   * Allow searching a private hosted zone.
   * @default false
   */
  readonly privateZone?: boolean;

  /**
   * Specifies the ID of the VPC associated with a private hosted zone.
   *
   * If a VPC ID is provided and privateZone is false, no results will be returned
   * and an error will be raised
   *
   * @default - No VPC ID
   */
  readonly vpcId?: string;
}

export interface StaticWebsiteProps extends WebsiteBucketProps {
  /**
   * BucketConfiguration is used to configured the S3 website bucket
   *
   * @default - The website bucket is provided with default values
   */
  readonly bucketConfiguration?: WebsiteBucketProps;

  /**
   * AliasConfiguration is used to configured CloudFront to respond to requests on custom domain names.
   *
   * @default - No custom domain names are set up
   */
  readonly aliasConfiguration?: AliasProps;

  /**
   * AWS WAF WebACL to associate with this CloudFront distribution
   *
   * @default - No AWS Web Application Firewall web access control list (web ACL)
   */
  readonly webACLId?: string;

  /**
   * An override flag that allows you to turn off support for IPv6 if required.
   *
   * @default - Cloudfront IPv6 support is enabled and if you've supplied an aliasConfiguration, an
   * AAAA record will be created for your service, set this to true to switch this off.
   */
  readonly disableIPv6?: boolean;
}

export class StaticWebsite extends Construct {
  private readonly distribution: CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: StaticWebsiteProps = {}) {
    super(scope, id);

    const { aliasConfiguration, bucketConfiguration, webACLId, disableIPv6 } = props;

    const websiteBucket = new WebsiteBucket(this, 'Bucket', {
      ...bucketConfiguration,
    });

    const distibutionConfig: CloudFrontWebDistributionProps = {
      webACLId,
      enableIpV6: !disableIPv6,
      originConfigs: [
        {
          s3OriginSource: {
            ...websiteBucket.s3OriginConfig,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      aliasConfiguration,
    };

    this.distribution = new CloudFrontWebDistribution(this, 'Distribution', distibutionConfig);

    if (aliasConfiguration) {
      new WebsiteAliasRecord(this, 'AliasRecord', {
        domainName: aliasConfiguration.domainName,
        recordNames: aliasConfiguration.names,
        target: new CloudFrontTarget(this.distribution),
        disableIPv6,
        privateZone: aliasConfiguration.privateZone,
        vpcId: aliasConfiguration.vpcId,
      });
    }
  }

  public addLambdaFunctionAssociation(assosiation: LambdaFunctionAssociation): void {
    this.addLambdaFunctionAssociations([assosiation]);
  }

  public addLambdaFunctionAssociations(assosiations: LambdaFunctionAssociation[]): void {
    const cfDist = this.distribution.node.findChild('CFDistribution') as CfnDistribution;

    cfDist.addOverride(
      'Properties.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations',
      assosiations.map((assosiation: LambdaFunctionAssociation) => ({
        EventType: assosiation.eventType,
        LambdaFunctionARN: assosiation.lambdaFunction.functionArn,
      })),
    );
  }
}
