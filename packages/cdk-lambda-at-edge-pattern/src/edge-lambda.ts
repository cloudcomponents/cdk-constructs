import { LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { IVersion } from '@aws-cdk/aws-lambda';

export interface IEdgeLambda {
  readonly eventType: LambdaEdgeEventType;
  readonly functionVersion: IVersion;
}
