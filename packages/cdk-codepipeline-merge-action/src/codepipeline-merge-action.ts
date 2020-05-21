import { PolicyStatement } from '@aws-cdk/aws-iam';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, Stack } from '@aws-cdk/core';
import { IRepository } from '@aws-cdk/aws-codecommit';
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
        } = this.props;

        const mergeBranchesFunction = new Function(
            scope,
            'MergeBranchesFunction',
            {
                runtime: Runtime.PYTHON_3_7,
                code: Code.fromAsset(`${LAMBDA_PATH}/merge-branches`),
                handler: 'merge_branches.lambda_handler',
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

        mergeBranchesFunction.addToRolePolicy(
            new PolicyStatement({
                resources: [repository.repositoryArn],
                actions: ['codecommit:MergeBranchesByFastForward'],
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
