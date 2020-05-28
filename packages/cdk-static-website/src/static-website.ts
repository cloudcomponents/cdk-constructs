import {
  AliasConfiguration,
  CloudFrontWebDistribution,
  CloudFrontWebDistributionProps,
} from '@aws-cdk/aws-cloudfront';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { Construct } from '@aws-cdk/core';

import {
  Association,
  LambdaFunctionAssociations,
} from './lambda-function-associations';
import { WebsiteAliasRecord } from './website-alias-record';
import { WebsiteBucket, WebsiteBucketProps } from './website-bucket';

export interface AliasProps extends AliasConfiguration {
  /** The domain name for the site like 'example.com' */
  readonly domainName: string;
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

    const {
      aliasConfiguration,
      bucketConfiguration,
      webACLId,
      disableIPv6,
    } = props;

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

    this.distribution = new CloudFrontWebDistribution(
      this,
      'Distribution',
      distibutionConfig,
    );

    if (aliasConfiguration) {
      new WebsiteAliasRecord(this, 'AliasRecord', {
        domainName: aliasConfiguration.domainName,
        recordNames: aliasConfiguration.names,
        target: new CloudFrontTarget(this.distribution),
        disableIPv6,
      });
    }
  }

  public addLambdaFunctionAssociation(
    assosiation: Association,
  ): LambdaFunctionAssociations {
    return this.addLambdaFunctionAssociations([assosiation]);
  }

  public addLambdaFunctionAssociations(
    assosiations: Association[],
  ): LambdaFunctionAssociations {
    return new LambdaFunctionAssociations(this, 'LambdaFunctionAssociation', {
      distribution: this.distribution,
      assosiations,
    });
  }
}
