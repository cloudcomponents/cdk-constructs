import * as path from 'path';
import {
  CfnCloudFrontOriginAccessIdentity,
  CloudFrontWebDistribution,
  SSLMethod,
  SecurityPolicyProtocol
} from '@aws-cdk/aws-cloudfront';
import { AliasRecord, HostedZoneProvider } from '@aws-cdk/aws-route53';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Construct, SSMParameterProvider } from '@aws-cdk/cdk';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface StaticWebsiteProps {
  domainName: string;
  siteSubDomain: string;
  source?: string;
  websiteIndexDocument?: string;
  websiteErrorDocument?: string;
}

export class StaticWebsite extends Construct {
  public readonly siteDomain: string;
  public readonly websiteBucket: Bucket;

  constructor(parent: Construct, name: string, props: StaticWebsiteProps) {
    super(parent, name);

    const {
      domainName,
      siteSubDomain,
      source,
      websiteIndexDocument,
      websiteErrorDocument
    } = props;

    this.siteDomain = `${siteSubDomain}.${domainName}`;

    const originId = new CfnCloudFrontOriginAccessIdentity(
      this,
      'OriginAccessIdentity',
      {
        cloudFrontOriginAccessIdentityConfig: {
          comment: `CloudFront OriginAccessIdentity for ${this.siteDomain}`
        }
      }
    );

    this.websiteBucket = new Bucket(this, 'WebsiteBucket', {
      bucketName: this.siteDomain,
      websiteIndexDocument: websiteIndexDocument || 'index.html',
      websiteErrorDocument: websiteErrorDocument || 'error.html'
    });

    this.websiteBucket.addToResourcePolicy(
      new PolicyStatement()
        .addAction('s3:GetObject')
        .addCanonicalUserPrincipal(
          originId.cloudFrontOriginAccessIdentityS3CanonicalUserId
        )
        .addResource(`${this.websiteBucket.bucketArn}/*`)
    );

    const placeHolderSource = path.join(__dirname, '..', 'website');

    new BucketDeployment(this, 'DeployWebsite', {
      source: Source.asset(source || placeHolderSource),
      destinationBucket: this.websiteBucket
    });

    const certificateArn = new SSMParameterProvider(this, {
      parameterName: 'CertificateArn-' + this.siteDomain
    }).parameterValue();

    if (certificateArn === 'dummy') {
      throw new Error(
        `No parameter with name CertificateArn-${this.siteDomain}`
      );
    }

    const distribution = new CloudFrontWebDistribution(
      this,
      'WebSiteDistribution',
      {
        aliasConfiguration: {
          acmCertRef: certificateArn,
          names: [this.siteDomain],
          sslMethod: SSLMethod.SNI,
          securityPolicy: SecurityPolicyProtocol.TLSv1_1_2016
        },
        originConfigs: [
          {
            s3OriginSource: {
              originAccessIdentity: originId,
              s3BucketSource: this.websiteBucket
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ]
      }
    );

    const zone = new HostedZoneProvider(this, {
      domainName
    }).findAndImport(this, 'Zone');

    new AliasRecord(this, 'WebsiteAliasRecord', {
      zone,
      recordName: this.siteDomain,
      target: distribution
    });
  }
}
