import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface BackupBucketProps extends BucketProps {
  readonly retentionPeriod?: Duration;
}

export class BackupBucket extends Bucket {
  constructor(scope: Construct, id: string, props?: BackupBucketProps) {
    const { retentionPeriod = Duration.days(35), ...rest } = props || {};

    super(scope, id, {
      lifecycleRules: [
        {
          expiration: retentionPeriod,
        },
      ],
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.RETAIN,
      ...rest,
    });
  }
}
