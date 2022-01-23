import { aws_cloudfront, aws_lambda } from 'aws-cdk-lib';

export interface ILambdaFunctionAssociation {
  readonly eventType: aws_cloudfront.LambdaEdgeEventType;
  readonly lambdaFunction: aws_lambda.IVersion;
}
