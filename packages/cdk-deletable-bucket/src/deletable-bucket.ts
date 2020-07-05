import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { Bucket, BucketProps } from '@aws-cdk/aws-s3';

import { EmptyBucket } from './empty-bucket';

export interface DeletableBucketProps extends BucketProps {
  /**
   * If the buckets contains objects, forces the deletion during stack deletion.
   *
   * @default false
   */
  readonly forceDelete?: boolean;
}

export class DeletableBucket extends Bucket {
  constructor(scope: Construct, id: string, props: DeletableBucketProps = {}) {
    const { forceDelete = false } = props;
    super(scope, id, {
      removalPolicy: forceDelete ? RemovalPolicy.DESTROY : undefined,
      ...props,
    });

    if (forceDelete) {
      new EmptyBucket(this, 'EmptyBucket', {
        bucket: this,
      });
    }
  }
}
