import * as path from 'path';
import { Arn, ArnFormat } from 'aws-cdk-lib';
import { PolicyStatement, IRole } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

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
      runtime: Runtime.NODEJS_18_X,
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
      const parameterArn = Arn.format(
        {
          service: 'ssm',
          resource: 'parameter',
          resourceName: props.parameterName.startsWith('/') ? props.parameterName.substring(1) : props.parameterName,
          arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
        },
        this.stack,
      );

      this.addToRolePolicy(
        new PolicyStatement({
          resources: [parameterArn],
          actions: ['ssm:GetParameter'],
        }),
      );
    }
  }
}
