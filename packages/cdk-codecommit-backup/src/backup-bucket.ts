import { Construct, RemovalPolicy, Duration } from '@aws-cdk/core';
import {
    Bucket,
    BucketProps,
    BucketEncryption,
    BlockPublicAccess,
} from '@aws-cdk/aws-s3';

export interface BackupBucketProps extends BucketProps {
    retentionPeriod?: Duration;
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
