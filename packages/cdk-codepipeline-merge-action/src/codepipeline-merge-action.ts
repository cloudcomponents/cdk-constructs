import { Construct, Stack } from '@aws-cdk/core';
import { PolicyStatement, IRole } from '@aws-cdk/aws-iam';
import { IRepository } from '@aws-cdk/aws-codecommit';
import {
  ActionCategory,
  CommonAwsActionProps,
  IStage,
  ActionBindOptions,
  ActionConfig,
} from '@aws-cdk/aws-codepipeline';
import { Action } from '@aws-cdk/aws-codepipeline-actions';

import { MergeBranchesFunction } from './merge-branches-function';

export interface CodePipelineMergeActionProps extends CommonAwsActionProps {
  /**
   * The CodeCommit repository.
   */
  readonly repository: IRepository;

  /**
   * The branch, tag, HEAD, or other fully qualified reference used to
   * identify a commit (for example, a branch name or a full commit ID).
   */
  readonly sourceCommitSpecifier: string;

  /**
   * The branch, tag, HEAD, or other fully qualified reference used to
   * identify a commit (for example, a branch name or a full commit ID).
   */
  readonly destinationCommitSpecifier: string;

  readonly codeCommitRole?: IRole;
}

/**
 * Represents a reference to a CodePipelineMergeAction.
 */
export class CodePipelineMergeAction extends Action {
  private readonly props: CodePipelineMergeActionProps;

  constructor(props: CodePipelineMergeActionProps) {
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
    const {
      repository,
      sourceCommitSpecifier,
      destinationCommitSpecifier,
      codeCommitRole,
    } = this.props;

    const mergeBranchesFunction = new MergeBranchesFunction(
      scope,
      'MergeBranchesFunction',
      {
        repository,
        codeCommitRole,
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
        resources: [mergeBranchesFunction.functionArn],
      }),
    );

    // allow lambda to put job results for this pipeline
    // CodePipeline requires this to be granted to '*'
    // (the Pipeline ARN will not be enough)
    mergeBranchesFunction.addToRolePolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: [
          'codepipeline:PutJobSuccessResult',
          'codepipeline:PutJobFailureResult',
        ],
      }),
    );

    return {
      configuration: {
        FunctionName: mergeBranchesFunction.functionName,
        UserParameters: Stack.of(scope).toJsonString({
          repositoryName: repository.repositoryName,
          sourceCommitSpecifier,
          destinationCommitSpecifier,
        }),
      },
    };
  }
}
