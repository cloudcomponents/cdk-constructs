import { LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { IVersion } from '@aws-cdk/aws-lambda';

export interface ILambdaFunctionAssociation {
  readonly eventType: LambdaEdgeEventType;
  readonly lambdaFunction: IVersion;
}
