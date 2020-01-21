import { S3OriginConfig, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Construct, RemovalPolicy } from '@aws-cdk/core';
import * as path from 'path';

export interface WebsiteBucketProps {
    /**
     * Name of the bucket
     *
     * @default - Assigned by CloudFormation (recommended).
     */
    readonly bucketName?: string;

    /**
     * Policy to apply when the bucket is removed from this stack.
     *
     * @default - The bucket will be orphaned.
     */
    readonly removalPolicy?: RemovalPolicy;

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
     * The index page for the site like 'index.html'
     *
     * @default - index.html
     */
    readonly websiteIndexDocument?: string;

    /**
     *  The error page for the site like 'error.html'
     *
     *  @default - error.html
     */
    readonly websiteErrorDocument?: string;
}

export class WebsiteBucket extends Construct {
    public readonly s3OriginConfig: S3OriginConfig;

    constructor(scope: Construct, id: string, props: WebsiteBucketProps = {}) {
        super(scope, id);

        const {
            bucketName,
            removalPolicy = RemovalPolicy.RETAIN,
            disableUpload = false,
            source,
            websiteIndexDocument,
            websiteErrorDocument,
        } = props;

        const bucket = new Bucket(this, 'WebsiteBucket', {
            bucketName,
            removalPolicy,
            websiteIndexDocument: websiteIndexDocument || 'index.html',
            websiteErrorDocument: websiteErrorDocument || 'error.html',
        });

        const originAccessIdentity = new OriginAccessIdentity(
            this,
            'OriginAccessIdentity',
            {
                comment: `CloudFront OriginAccessIdentity for ${bucket.bucketName}`,
            },
        );

        bucket.grantRead(originAccessIdentity.grantPrincipal);

        if (!disableUpload) {
            const placeHolderSource = path.join(__dirname, '..', 'website');

            new BucketDeployment(this, 'WebsiteDeployment', {
                sources: [Source.asset(source || placeHolderSource)],
                destinationBucket: bucket,
                retainOnDelete: removalPolicy === RemovalPolicy.RETAIN,
            });
        }

        this.s3OriginConfig = {
            originAccessIdentity,
            s3BucketSource: bucket,
        };
    }
}
