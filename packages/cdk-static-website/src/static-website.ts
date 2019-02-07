import * as path from 'path';
import {
  CfnCloudFrontOriginAccessIdentity,
  CloudFrontWebDistribution,
  CloudFrontWebDistributionProps,
  SSLMethod,
  SecurityPolicyProtocol
} from '@aws-cdk/aws-cloudfront';
import { AliasRecord, HostedZoneProvider } from '@aws-cdk/aws-route53';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Construct, SSMParameterProvider } from '@aws-cdk/cdk';
import { PolicyStatement } from '@aws-cdk/aws-iam';

import {
  LambdaFunctionAssociations,
  Association
} from './lambda-function-associations';

export interface AliasConfiguration {
  domainName: string;
  siteSubDomain: string;
}

export interface StaticWebsiteProps {
  /** Logical name of the site */
  siteName: string;

  aliasConfiguration?: AliasConfiguration;

  source?: string;

  disableUpload?: false;

  /** The index page for the site like 'index.html' */
  websiteIndexDocument?: string;

  /** The error page for the site like 'error.html' */
  websiteErrorDocument?: string;

  /** AWS WAF WebACL to associate with this CloudFront distribution */
  webACLId?: string;
}

export class StaticWebsite extends Construct {
  /** The static websites URL */
  public readonly url: string;

  private readonly distribution: CloudFrontWebDistribution;

  constructor(parent: Construct, name: string, props: StaticWebsiteProps) {
    super(parent, name);

    const {
      aliasConfiguration,
      siteName,
      disableUpload,
      source,
      websiteIndexDocument,
      websiteErrorDocument,
      webACLId
    } = props;

    const originId = new CfnCloudFrontOriginAccessIdentity(
      this,
      'OriginAccessIdentity',
      {
        cloudFrontOriginAccessIdentityConfig: {
          comment: `CloudFront OriginAccessIdentity for ${siteName}`
        }
      }
    );

    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      bucketName: siteName,
      websiteIndexDocument: websiteIndexDocument || 'index.html',
      websiteErrorDocument: websiteErrorDocument || 'error.html'
    });

    websiteBucket.addToResourcePolicy(
      new PolicyStatement()
        .addAction('s3:GetObject')
        .addCanonicalUserPrincipal(
          originId.cloudFrontOriginAccessIdentityS3CanonicalUserId
        )
        .addResource(`${websiteBucket.bucketArn}/*`)
    );

    if (!disableUpload) {
      const placeHolderSource = path.join(__dirname, '..', 'website');

      new BucketDeployment(this, 'DeployWebsite', {
        source: Source.asset(source || placeHolderSource),
        destinationBucket: websiteBucket
      });
    }

    const distibutionConfig: CloudFrontWebDistributionProps = {
      originConfigs: [
        {
          s3OriginSource: {
            originAccessIdentity: originId,
            s3BucketSource: websiteBucket
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ]
    };

    this.distribution = aliasConfiguration
      ? this.configureDistributionWithAlias(
          aliasConfiguration,
          distibutionConfig
        )
      : new CloudFrontWebDistribution(
          this,
          'WebSiteDistribution',
          distibutionConfig
        );

    this.url = aliasConfiguration
      ? this.createSiteDomain(aliasConfiguration)
      : this.distribution.domainName;
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

  private createSiteDomain(aliasConfiguration: AliasConfiguration) {
    const { siteSubDomain, domainName } = aliasConfiguration;

    return `${siteSubDomain}.${domainName}`;
  }

  private configureDistributionWithAlias(
    aliasConfiguration: AliasConfiguration,
    distibutionConfig: CloudFrontWebDistributionProps
  ) {
    const siteDomain = this.createSiteDomain(aliasConfiguration);

    const certificateArn = new SSMParameterProvider(this, {
      parameterName: 'CertificateArn-' + siteDomain
    }).parameterValue();

    if (certificateArn === 'dummy') {
      throw new Error(`No parameter with name CertificateArn-${siteDomain}`);
    }

    distibutionConfig.aliasConfiguration = {
      acmCertRef: certificateArn,
      names: [siteDomain],
      sslMethod: SSLMethod.SNI,
      securityPolicy: SecurityPolicyProtocol.TLSv1_1_2016
    };

    const distribution = new CloudFrontWebDistribution(
      this,
      'WebSiteDistribution',
      distibutionConfig
    );

    const { domainName } = aliasConfiguration;

    const zone = new HostedZoneProvider(this, {
      domainName
    }).findAndImport(this, 'Zone');

    new AliasRecord(this, 'WebsiteAliasRecord', {
      zone,
      recordName: siteDomain,
      target: distribution
    });

    return distribution;
  }
}
