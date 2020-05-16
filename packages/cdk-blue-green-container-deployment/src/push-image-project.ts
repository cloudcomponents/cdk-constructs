import { Construct, Stack } from '@aws-cdk/core';
import {
    Cache,
    LocalCacheMode,
    PipelineProject,
    BuildSpec,
    LinuxBuildImage,
    ComputeType,
    BuildEnvironmentVariable,
    BuildEnvironmentVariableType,
} from '@aws-cdk/aws-codebuild';
import { IRepository } from '@aws-cdk/aws-ecr';
import { PolicyStatement } from '@aws-cdk/aws-iam';

import { IDummyTaskDefinition } from './dummy-task-definition';
import { BuildSpecGenerator } from './build-spec-generator';

export interface PushImageProjectProps {
    imageRepository: IRepository;
    taskDefinition: IDummyTaskDefinition;
    environmentVariables?: Record<string, BuildEnvironmentVariable>;
    projectName?: string;
    cache?: Cache;
    buildSpec?: BuildSpec;
    computeType?: ComputeType;
}

export class PushImageProject extends PipelineProject {
    constructor(scope: Construct, id: string, props: PushImageProjectProps) {
        const { account, region } = Stack.of(scope);
        super(scope, id, {
            projectName: props.projectName,
            cache:
                props.cache ||
                Cache.local(LocalCacheMode.DOCKER_LAYER, LocalCacheMode.CUSTOM),
            buildSpec:
                props.buildSpec ||
                BuildSpec.fromObject(
                    BuildSpecGenerator.default({ account, region }).render(),
                ),
            environment: {
                buildImage: LinuxBuildImage.STANDARD_4_0,
                computeType: props.computeType || ComputeType.SMALL,
                privileged: true,
                environmentVariables: {
                    AWS_ACCOUNT_ID: {
                        type: BuildEnvironmentVariableType.PLAINTEXT,
                        value: account,
                    },
                    EXECUTION_ROLE_ARN: {
                        type: BuildEnvironmentVariableType.PLAINTEXT,
                        value: props.taskDefinition.executionRole.roleArn,
                    },
                    FAMILY: {
                        type: BuildEnvironmentVariableType.PLAINTEXT,
                        value: props.taskDefinition.family,
                    },
                    REPOSITORY_URI: {
                        type: BuildEnvironmentVariableType.PLAINTEXT,
                        value: props.imageRepository.repositoryUri,
                    },
                    ...props.environmentVariables,
                },
            },
        });

        this.addToRolePolicy(
            new PolicyStatement({
                actions: ['ecr:GetAuthorizationToken'],
                resources: ['*'],
            }),
        );

        this.addToRolePolicy(
            new PolicyStatement({
                actions: [
                    'ecr:GetDownloadUrlForLayer',
                    'ecr:BatchGetImage',
                    'ecr:BatchCheckLayerAvailability',
                    'ecr:PutImage',
                    'ecr:InitiateLayerUpload',
                    'ecr:UploadLayerPart',
                    'ecr:CompleteLayerUpload',
                ],
                resources: [props.imageRepository.repositoryArn],
            }),
        );
    }
}
