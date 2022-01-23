import { aws_cloudfront, aws_lambda } from 'aws-cdk-lib';

export interface IEdgeLambda {
  readonly eventType: aws_cloudfront.LambdaEdgeEventType;
  readonly functionVersion: aws_lambda.IVersion;
}
