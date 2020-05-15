import * as path from 'path';
import {
    BuildSpec,
    ComputeType,
    IBuildImage,
    LinuxBuildImage,
    Project,
    Source,
} from '@aws-cdk/aws-codebuild';
import { IRepository } from '@aws-cdk/aws-codecommit';
import {
    EventField,
    RuleTargetInput,
    OnEventOptions,
    Rule,
} from '@aws-cdk/aws-events';
import { CodeBuildProject, LambdaFunction } from '@aws-cdk/aws-events-targets';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';

export interface PullRequestCheckProps {
    /**
     * The CodeCommit repository.
     */
    readonly repository: IRepository;

    /**
     * The human-visible name of this PullRequest-Project.
     *  * @default taken from {@link #repository:#repositoryName}-pull-request
     */
    readonly projectName?: string;

    /**
     * Filename or contents of buildspec in JSON format.
     * @see https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-example
     */
    readonly buildSpec: BuildSpec;

    /**
     * Build environment to use for the build.
     *
     * @default BuildEnvironment.LinuxBuildImage.STANDARD_2_0
     */
    readonly buildImage?: IBuildImage;

    /**
     * The type of compute to use for this build.
     * See the {@link ComputeType} enum for the possible values.
     *
     * @default taken from {@link #buildImage#defaultComputeType}
     */
    readonly computeType?: ComputeType;

    /**
     * Indicates how the project builds Docker images. Specify true to enable
     * running the Docker daemon inside a Docker container. This value must be
     * set to true only if this build project will be used to build Docker
     * images, and the specified build environment image is not one provided by
     * AWS CodeBuild with Docker support. Otherwise, all associated builds that
     * attempt to interact with the Docker daemon will fail.
     *
     * @default false
     */
    readonly privileged?: boolean;

    /**
     * Indicates whether the approval state [APPROVE, REVOKE] should be updated
     *
     * @default true
     */
    readonly updateApprovalState?: boolean;

    /**
     * Specifies whether comments should be written in the request
     *
     * @default true
     */
    readonly postComment?: boolean;
}

/**
 * Represents a reference to a PullRequestCheck.
 */
export class PullRequestCheck extends Construct {
    private pullRequestProject: Project;

    public constructor(
        scope: Construct,
        id: string,
        props: PullRequestCheckProps,
    ) {
        super(scope, id);

        const {
            repository,
            buildSpec,
            buildImage = LinuxBuildImage.STANDARD_4_0,
            computeType = buildImage.defaultComputeType,
            privileged = false,
            updateApprovalState = true,
            postComment = true,
            projectName = `${repository.repositoryName}-pull-request`,
        } = props;

        this.pullRequestProject = new Project(this, 'PullRequestProject', {
            projectName,
            source: Source.codeCommit({
                repository,
            }),
            environment: {
                buildImage,
                computeType,
                privileged,
            },
            buildSpec,
        });

        if (updateApprovalState || postComment) {
            const codeBuildResultFunction = new Function(
                this,
                'CodeBuildResultFunction',
                {
                    runtime: Runtime.PYTHON_3_7,
                    code: Code.asset(path.join(__dirname, '..', 'lambdas')),
                    handler: 'code_build_result.lambda_handler',
                    environment: {
                        UPDATE_APPROVAL_STATE: updateApprovalState
                            ? 'TRUE'
                            : 'FALSE',
                        POST_COMMENT: postComment ? 'TRUE' : 'FALSE',
                    },
                },
            );

            codeBuildResultFunction.addToRolePolicy(
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    resources: [repository.repositoryArn],
                    actions: [
                        'codecommit:PostCommentForPullRequest',
                        'codecommit:UpdatePullRequestApprovalState',
                    ],
                }),
            );

            this.pullRequestProject.onStateChange('PullRequestValidationRule', {
                target: new LambdaFunction(codeBuildResultFunction),
            });
        }

        const rule = repository.onPullRequestStateChange(
            'PullRequestChangeRule',
            {
                eventPattern: {
                    detail: {
                        event: [
                            'pullRequestSourceBranchUpdated',
                            'pullRequestCreated',
                        ],
                    },
                },
            },
        );

        rule.addTarget(
            new CodeBuildProject(this.pullRequestProject, {
                event: RuleTargetInput.fromObject({
                    sourceVersion: EventField.fromPath('$.detail.sourceCommit'),
                    artifactsOverride: { type: 'NO_ARTIFACTS' },
                    environmentVariablesOverride: [
                        {
                            name: 'pullRequestId',
                            value: EventField.fromPath(
                                '$.detail.pullRequestId',
                            ),
                            type: 'PLAINTEXT',
                        },
                        {
                            name: 'repositoryName',
                            value: EventField.fromPath(
                                '$.detail.repositoryNames[0]',
                            ),
                            type: 'PLAINTEXT',
                        },
                        {
                            name: 'sourceCommit',
                            value: EventField.fromPath('$.detail.sourceCommit'),
                            type: 'PLAINTEXT',
                        },
                        {
                            name: 'destinationCommit',
                            value: EventField.fromPath(
                                '$.detail.destinationCommit',
                            ),
                            type: 'PLAINTEXT',
                        },
                        {
                            name: 'revisionId',
                            value: EventField.fromPath('$.detail.revisionId'),
                            type: 'PLAINTEXT',
                        },
                    ],
                }),
            }),
        );
    }

    /**
     * Defines an event rule which triggers when a check fails.
     */
    public onCheckFailed(id: string, options?: OnEventOptions): Rule {
        return this.pullRequestProject.onBuildFailed(id, options);
    }

    /**
     * Defines an event rule which triggers when a check starts.
     */
    public onCheckStarted(id: string, options?: OnEventOptions): Rule {
        return this.pullRequestProject.onBuildStarted(id, options);
    }

    /**
     * Defines an event rule which triggers when a check complets successfully.
     */
    public onCheckSucceeded(id: string, options?: OnEventOptions): Rule {
        return this.pullRequestProject.onBuildSucceeded(id, options);
    }
}
