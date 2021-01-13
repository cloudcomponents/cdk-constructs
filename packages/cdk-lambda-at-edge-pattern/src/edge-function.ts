import { LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { Code, Function, Runtime, IVersion } from '@aws-cdk/aws-lambda';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { Construct } from '@aws-cdk/core';

import { BaseEdgeConstruct } from './base-edge-construct';
import { EdgeFunctionProvider } from './edge-function-provider';
import { IEdgeLambda } from './edge-lambda';
import { EdgeRole, IEdgeRole } from './edge-role';
import { ILambdaFunctionAssociation } from './lambda-function-association';
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
  readonly code: Code;
  readonly name: string;
  readonly eventType: LambdaEdgeEventType;
}

export class EdgeFunction extends BaseEdgeConstruct implements ILambdaFunctionAssociation, IEdgeLambda {
  public readonly edgeRole: IEdgeRole;
  public readonly eventType: LambdaEdgeEventType;
  public readonly functionVersion: IVersion;
  public readonly lambdaFunction: IVersion;

  constructor(scope: Construct, id: string, props: EdgeFunctionProps) {
    super(scope, id);

    const { name, parameterName = `/cloudcomponents/edge-lambda/${this.stack.stackName}/${name}/${this.stack.node.addr}` } = props;

    this.edgeRole = props.edgeRole ?? new EdgeRole(this, `${name}Role`);

    this.eventType = props.eventType;

    const edgeFunction = new Function(this.edgeStack, `${name}Function`, {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: props.code,
      role: this.edgeRole.role,
    });

    const parameter = new StringParameter(this.edgeStack, `${name}StringParameter`, {
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

    this.lambdaFunction = this.functionVersion;
  }
}
