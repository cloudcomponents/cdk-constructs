import * as path from 'path';
import { LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { Code } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';

import { EdgeFunction, CommonEdgeFunctionProps } from './edge-function';
import { LogLevel } from './with-configuration';

export interface OriginMutationProps extends CommonEdgeFunctionProps {
  readonly logLevel?: LogLevel;
}

export class OriginMutation extends EdgeFunction {
  constructor(scope: Construct, id: string, props: OriginMutationProps = {}) {
    super(scope, id, {
      name: 'origin-mutation',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'origin-mutation')),
      eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
      edgeRole: props.edgeRole,
      configuration: {
        logLevel: props.logLevel ?? LogLevel.WARN,
      },
    });
  }
}
