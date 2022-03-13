import * as path from 'path';
import { CustomResource, Duration } from 'aws-cdk-lib';
import { SingletonFunction, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export interface EmptyBucketProps {
  readonly bucket: IBucket;
}

export class EmptyBucket extends Construct {
  constructor(scope: Construct, id: string, props: EmptyBucketProps) {
    super(scope, id);

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
