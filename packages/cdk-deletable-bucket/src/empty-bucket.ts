import * as path from 'path';
import { Construct, CustomResource, Duration } from '@aws-cdk/core';
import { IBucket } from '@aws-cdk/aws-s3';
import { SingletonFunction, Code, Runtime } from '@aws-cdk/aws-lambda';
import { Provider } from '@aws-cdk/custom-resources';

export interface EmptyBucketProps {
  readonly bucket: IBucket;
}

export class EmptyBucket extends Construct {
  constructor(parent: Construct, id: string, props: EmptyBucketProps) {
    super(parent, id);

    const onEvent = new SingletonFunction(this, 'EmptyBucketFunction', {
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'empty-bucket')),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_12_X,
      uuid: 'CloudcomponentsEmptyBucketCustomResource',
      timeout: Duration.minutes(15),
    });

    props.bucket.grantReadWrite(onEvent);

    const provider = new Provider(this, 'EmptyBucketProvider', {
      onEventHandler: onEvent,
    });

    new CustomResource(this, 'CustomResource', {
      serviceToken: provider.serviceToken,
      resourceType: 'Custom::EmptyBucket',
      properties: {
        BucketName: props.bucket.bucketName,
      },
    });
  }
}
