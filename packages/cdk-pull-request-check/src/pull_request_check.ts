import * as path from 'path';
import { Construct } from '@aws-cdk/core';
import { IRepository } from '@aws-cdk/aws-codecommit';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { ServicePrincipal, Role, PolicyStatement } from '@aws-cdk/aws-iam';
import {
    Project,
    Source,
    LinuxBuildImage,
    ComputeType,
    BuildSpec,
} from '@aws-cdk/aws-codebuild';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';

import { PullRequestProjectTarget } from './pull_request_project_target';

export interface PullRequestCheckProps {
    repository: IRepository;
    buildSpec: BuildSpec;
    buildImage?: LinuxBuildImage;
    computeType?: ComputeType;
}
export class PullRequestCheck extends Construct {
    public constructor(
        parent: Construct,
        id: string,
        props: PullRequestCheckProps,
    ) {
        super(parent, id);

        const {
            repository,
            buildSpec,
            buildImage = LinuxBuildImage.STANDARD_2_0,
            computeType = ComputeType.SMALL,
        } = props;

        const lambdaRole = new Role(this, 'LambdaRole', {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });

        lambdaRole.addToPolicy(
            new PolicyStatement({
                resources: ['*'],
                actions: [
                    'codebuild:*',
                    'codecommit:*',
                    'logs:CreateLogGroup',
                    'logs:CreateLogStream',
                    'logs:PutLogEvents',
                    'logs:GetLogEvents',
                ],
            }),
        );

        const pullRequestFunction = new Function(this, 'PullRequestFunction', {
            runtime: Runtime.PYTHON_3_7,
            code: Code.asset(path.join(__dirname, '..', 'resources')),
            handler: 'pull_request.lambda_handler',
            role: lambdaRole,
        });

        const codeBuildResultFunction = new Function(
            this,
            'CodeBuildResultFunction',
            {
                runtime: Runtime.PYTHON_3_7,
                code: Code.asset(path.join(__dirname, '..', 'resources')),
                handler: 'code_build_result.lambda_handler',
                role: lambdaRole,
            },
        );

        const pullRequestProject = new Project(this, 'PullRequestProject', {
            projectName: `${repository.repositoryName}-pull-request`,
            source: Source.codeCommit({
                repository,
            }),
            environment: {
                buildImage,
                computeType,
            },
            buildSpec,
        });

        pullRequestProject.onStateChange('PullRequestValidationRule', {
            target: new LambdaFunction(codeBuildResultFunction),
        });

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

        rule.addTarget(new LambdaFunction(pullRequestFunction));
        rule.addTarget(new PullRequestProjectTarget(pullRequestProject));
    }
}
