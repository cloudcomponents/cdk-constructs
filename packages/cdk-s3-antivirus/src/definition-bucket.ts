import { RemovalPolicy } from 'aws-cdk-lib';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface DefinitionBucketProps {
  readonly bucketName?: string;
  readonly vpcEndpoint: string;
}

export class DefinitionBucket extends Bucket {
  constructor(scope: Construct, id: string, props: DefinitionBucketProps) {
    super(scope, id, {
      bucketName: props.bucketName,
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      enforceSSL: true,
    });

    this.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetObject', 's3:ListBucket'],
        principals: [new AnyPrincipal()],
        resources: [this.bucketArn, this.arnForObjects('*')],
        conditions: {
          StringEquals: {
            'aws:SourceVpce': props.vpcEndpoint,
          },
        },
      }),
    );
  }
}
