import * as path from 'path';
import { aws_cloudfront, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { EdgeFunction, CommonEdgeFunctionProps } from './edge-function';
import { LogLevel } from './with-configuration';

export interface OriginMutationProps extends CommonEdgeFunctionProps {
  readonly logLevel?: LogLevel;
}

export class OriginMutation extends EdgeFunction {
  constructor(scope: Construct, id: string, props: OriginMutationProps = {}) {
    super(scope, id, {
      name: 'origin-mutation',
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'origin-mutation')),
      eventType: aws_cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
      edgeRole: props.edgeRole,
      configuration: {
        logLevel: props.logLevel ?? LogLevel.WARN,
      },
    });
  }
}
