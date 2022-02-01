import { aws_cloudfront, aws_lambda, aws_ssm } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { BaseEdgeConstruct } from './base-edge-construct';
import { EdgeFunctionProvider } from './edge-function-provider';
import { IEdgeLambda } from './edge-lambda';
import { EdgeRole, IEdgeRole } from './edge-role';
import { Configuration, WithConfiguration } from './with-configuration';

export interface CommonEdgeFunctionProps {
  /**
   * The name of the parameter.
   */
  readonly parameterName?: string;

  readonly edgeRole?: IEdgeRole;
}

export interface EdgeFunctionProps extends CommonEdgeFunctionProps {
  readonly configuration: Configuration;
  readonly code: aws_lambda.Code;
  readonly name: string;
  readonly eventType: aws_cloudfront.LambdaEdgeEventType;
}

export class EdgeFunction extends BaseEdgeConstruct implements IEdgeLambda {
  public readonly edgeRole: IEdgeRole;
  public readonly eventType: aws_cloudfront.LambdaEdgeEventType;
  public readonly functionVersion: aws_lambda.IVersion;

  constructor(scope: Construct, id: string, props: EdgeFunctionProps) {
    super(scope, id);
    const stack = this.stack.nestedStackParent ?? this.stack;

    const { name, parameterName = `/cloudcomponents/edge-lambda/${stack.stackName}/${name}/${this.stack.node.addr}` } = props;

    this.edgeRole = props.edgeRole ?? new EdgeRole(this, `${name}Role`);

    this.eventType = props.eventType;

    const edgeFunction = new aws_lambda.Function(this.edgeStack, `${name}Function`, {
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: props.code,
      role: this.edgeRole.role,
    });

    const parameter = new aws_ssm.StringParameter(this.edgeStack, `${name}StringParameter`, {
      parameterName,
      description: 'Parameter stored for cross region Lambda@Edge',
      stringValue: edgeFunction.functionArn,
    });

    const { edgeFunction: retrievedEdgeFunction } = new EdgeFunctionProvider(scope, `${name}Provider`, {
      parameter,
    });

    const lambdaWithConfig = new WithConfiguration(this, 'WithConfiguration', {
      function: retrievedEdgeFunction,
      configuration: props.configuration,
    });

    this.functionVersion = lambdaWithConfig.functionVersion;
  }
}
