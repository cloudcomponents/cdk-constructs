import {
  AliasConfiguration,
  CloudFrontWebDistribution,
  CloudFrontWebDistributionProps
} from '@aws-cdk/aws-cloudfront';
import { Construct } from '@aws-cdk/cdk';
import { WebsiteBucket, WebsiteBucketProps } from './website-bucket';
import { WebsiteAliasRecord } from './website-alias-record';
import {
  LambdaFunctionAssociations,
  Association
} from './lambda-function-associations';

export interface AliasProps extends AliasConfiguration {
  /** The domain name for the site like 'cloudcomponents.org' */
  domainName: string;
}

export interface StaticWebsiteProps extends WebsiteBucketProps {
  bucketConfiguration?: WebsiteBucketProps;

  aliasConfiguration?: AliasProps;

  /** AWS WAF WebACL to associate with this CloudFront distribution */
  webACLId?: string;
}

export class StaticWebsite extends Construct {
  private readonly distribution: CloudFrontWebDistribution;

  constructor(parent: Construct, name: string, props: StaticWebsiteProps) {
    super(parent, name);

    const { aliasConfiguration, bucketConfiguration, webACLId } = props;

    const websiteBucket = new WebsiteBucket(this, 'WebsiteBucket', {
      ...bucketConfiguration
    });

    const distibutionConfig: CloudFrontWebDistributionProps = {
      webACLId,
      originConfigs: [
        {
          s3OriginSource: {
            ...websiteBucket.s3OriginSource
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ],
      aliasConfiguration
    };

    this.distribution = new CloudFrontWebDistribution(
      this,
      'WebSiteDistribution',
      distibutionConfig
    );

    if (aliasConfiguration) {
      new WebsiteAliasRecord(this, 'WebsiteAliasRecord', {
        domainName: aliasConfiguration.domainName,
        recordNames: aliasConfiguration.names,
        target: this.distribution
      });
    }
  }

  public addLambdaFunctionAssociation(assosiation: Association) {
    return this.addLambdaFunctionAssociations([assosiation]);
  }

  public addLambdaFunctionAssociations(assosiations: Association[]) {
    return new LambdaFunctionAssociations(this, 'LambdaFunctionAssociation', {
      distribution: this.distribution,
      assosiations
    });
  }
}
