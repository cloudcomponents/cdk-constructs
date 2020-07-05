import { PolicyStatement } from '@aws-cdk/aws-iam';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, Stack } from '@aws-cdk/core';
import {
  ActionCategory,
  CommonAwsActionProps,
  IStage,
  ActionBindOptions,
  ActionConfig,
} from '@aws-cdk/aws-codepipeline';
import { Action } from '@aws-cdk/aws-codepipeline-actions';

import * as path from 'path';

const LAMBDA_PATH = path.join(__dirname, '..', 'lambdas');

export interface RegExp {
  readonly source: string;
}

export interface CommonCodePipelineCheckParameterActionProps
  extends CommonAwsActionProps {
  /**
   * The name of the parameter.
   */
  readonly parameterName: string;

  /**
   * Parameter is logged after successful check
   *
   * @default false The parameter is not logged
   */
  readonly logParameter?: boolean;
}

export interface CodePipelineCheckParameterActionProps
  extends CommonCodePipelineCheckParameterActionProps {
  /**
   * Regular expression to validate the parameter.
   */
  readonly regExp?: RegExp;
}

/**
 * Represents a reference to a CodePipelineCheckParameterAction.
 */
export class CodePipelineCheckParameterAction extends Action {
  private readonly props: CodePipelineCheckParameterActionProps;

  constructor(props: CodePipelineCheckParameterActionProps) {
    super({
      ...props,
      category: ActionCategory.INVOKE,
      provider: 'Lambda',
      artifactBounds: {
        minInputs: 0,
        maxInputs: 0,
        minOutputs: 0,
        maxOutputs: 0,
      },
    });

    this.props = props;
  }

  protected bound(
    scope: Construct,
    _stage: IStage,
    options: ActionBindOptions,
  ): ActionConfig {
    const { parameterName, regExp, logParameter = false } = this.props;

    const checkParameterFunction = new Function(
      scope,
      'CheckParamterFunction',
      {
        runtime: Runtime.PYTHON_3_7,
        code: Code.fromAsset(`${LAMBDA_PATH}/check-parameter`),
        handler: 'check_parameter.lambda_handler',
      },
    );

    // allow pipeline to list functions
    options.role.addToPolicy(
      new PolicyStatement({
        actions: ['lambda:ListFunctions'],
        resources: ['*'],
      }),
    );

    // allow pipeline to invoke this lambda functionn
    options.role.addToPolicy(
      new PolicyStatement({
        actions: ['lambda:InvokeFunction'],
        resources: [checkParameterFunction.functionArn],
      }),
    );

    // allow lambda to put job results for this pipeline
    // CodePipeline requires this to be granted to '*'
    // (the Pipeline ARN will not be enough)
    checkParameterFunction.addToRolePolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: [
          'codepipeline:PutJobSuccessResult',
          'codepipeline:PutJobFailureResult',
        ],
      }),
    );

    const parameterArn = Stack.of(scope).formatArn({
      service: 'ssm',
      resource: 'parameter',
      sep: parameterName.startsWith('/') ? '' : '/',
      resourceName: parameterName,
    });

    checkParameterFunction.addToRolePolicy(
      new PolicyStatement({
        resources: [parameterArn],
        actions: ['ssm:GetParameter'],
      }),
    );

    return {
      configuration: {
        FunctionName: checkParameterFunction.functionName,
        UserParameters: Stack.of(scope).toJsonString({
          parameterName,
          regExp: regExp ? regExp.source : undefined,
          logParameter,
        }),
      },
    };
  }
}
