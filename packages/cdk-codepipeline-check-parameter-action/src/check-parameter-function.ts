import * as path from 'path';
import { Construct, Stack } from '@aws-cdk/core';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { PolicyStatement, IRole } from '@aws-cdk/aws-iam';

export interface CheckParamterFunctionProps {
  /**
   * The name of the parameter.
   */
  readonly parameterName: string;

  /**
   * Role for crossAccount permission
   */
  readonly crossAccountRole?: IRole;
}

export class CheckParameterFunction extends Function {
  constructor(scope: Construct, id: string, props: CheckParamterFunctionProps) {
    super(scope, id, {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'check-parameter')),
    });

    if (props.crossAccountRole) {
      this.addToRolePolicy(
        new PolicyStatement({
          resources: [props.crossAccountRole.roleArn],
          actions: ['sts:AssumeRole'],
        }),
      );
    } else {
      const parameterArn = Stack.of(scope).formatArn({
        service: 'ssm',
        resource: 'parameter',
        sep: props.parameterName.startsWith('/') ? '' : '/',
        resourceName: props.parameterName,
      });

      this.addToRolePolicy(
        new PolicyStatement({
          resources: [parameterArn],
          actions: ['ssm:GetParameter'],
        }),
      );
    }
  }
}
