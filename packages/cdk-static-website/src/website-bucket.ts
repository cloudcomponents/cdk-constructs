import * as path from 'path';
import { CfnCloudFrontOriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { CanonicalUserPrincipal  } from '@aws-cdk/aws-iam';

export interface WebsiteBucketProps {
  /** Name of the bucket */
  bucketName?: string;

  /** Policy to apply when the bucket is removed from this stack. */
  removalPolicy?: RemovalPolicy;

  source?: string;

  disableUpload?: boolean;

  /** The index page for the site like 'index.html' */
  websiteIndexDocument?: string;

  /** The error page for the site like 'error.html' */
  websiteErrorDocument?: string;
}

export class WebsiteBucket extends Construct {
  private readonly originId: CfnCloudFrontOriginAccessIdentity;
  private readonly bucket: Bucket;

  constructor(parent: Construct, name: string, props: WebsiteBucketProps) {
    super(parent, name);

    const {
      bucketName,
      removalPolicy,
      disableUpload = false,
      source,
      websiteIndexDocument,
      websiteErrorDocument
    } = props;

    this.bucket = new Bucket(this, 'WebsiteBucket', {
      bucketName,
      removalPolicy,
      websiteIndexDocument: websiteIndexDocument || 'index.html',
      websiteErrorDocument: websiteErrorDocument || 'error.html'
    });

    this.originId = new CfnCloudFrontOriginAccessIdentity(
      this,
      'OriginAccessIdentity',
      {
        cloudFrontOriginAccessIdentityConfig: {
          comment: `CloudFront OriginAccessIdentity for ${
            this.bucket.bucketName
          }`
        }
      }
    );

    this.bucket.grantRead(new CanonicalUserPrincipal(this.originId.attrS3CanonicalUserId))

    if (!disableUpload) {
      const placeHolderSource = path.join(__dirname, '..', 'website');

      new BucketDeployment(this, 'DeployWebsite', {
        source: Source.asset(source || placeHolderSource),
        destinationBucket: this.bucket
      });
    }
  }

  public get s3OriginSource() {
    return {
      originAccessIdentity: this.originId,
      s3BucketSource: this.bucket
    };
  }
}
