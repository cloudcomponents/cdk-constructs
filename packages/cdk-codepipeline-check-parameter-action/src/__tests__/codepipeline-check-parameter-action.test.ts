import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { CodepipelineCheckParameterAction } from '../codepipeline-check-parameter-action';

test('default setup', (): void => {
    const stack = new Stack();

    const repository = new Repository(stack, 'Repository', {
        repositoryName: 'MyRepositoryName',
        description: 'Some description.',
    });

    const parameterName = '/test';

    const sourceArtifact = new Artifact();

    new Pipeline(stack, 'Pipeline', {
        stages: [
            {
                stageName: 'Source',
                actions: [
                    new CodeCommitSourceAction({
                        actionName: 'CodeCommit',
                        repository,
                        output: sourceArtifact,
                    }),
                ],
            },
            {
                stageName: 'CheckParamter',
                actions: [
                    new CodepipelineCheckParameterAction({
                        actionName: 'CheckParamter',
                        parameterName,
                    }),
                ],
            },
        ],
    });

    expect(stack).toMatchCdkSnapshot();
});

test('with regExp', (): void => {
    const stack = new Stack();

    const repository = new Repository(stack, 'Repository', {
        repositoryName: 'MyRepositoryName',
        description: 'Some description.',
    });

    const parameterName = '/test';

    const sourceArtifact = new Artifact();

    new Pipeline(stack, 'Pipeline', {
        stages: [
            {
                stageName: 'Source',
                actions: [
                    new CodeCommitSourceAction({
                        actionName: 'CodeCommit',
                        repository,
                        output: sourceArtifact,
                    }),
                ],
            },
            {
                stageName: 'CheckParamter',
                actions: [
                    new CodepipelineCheckParameterAction({
                        actionName: 'CheckParamter',
                        parameterName,
                        regExp: /[0123456789]/,
                    }),
                ],
            },
        ],
    });

    expect(stack).toMatchCdkSnapshot();
});
