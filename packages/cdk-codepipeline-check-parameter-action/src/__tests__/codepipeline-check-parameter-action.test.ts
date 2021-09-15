import { Repository } from '@aws-cdk/aws-codecommit';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { CodePipelineCheckParameterAction } from '../codepipeline-check-parameter-action';

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
          new CodePipelineCheckParameterAction({
            actionName: 'CheckParamter',
            parameterName,
          }),
        ],
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
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
          new CodePipelineCheckParameterAction({
            actionName: 'CheckParamter',
            parameterName,
            regExp: /[0123456789]/,
          }),
        ],
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test('multiple', (): void => {
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
  });

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
          new CodePipelineCheckParameterAction({
            actionName: 'CheckParamter1',
            parameterName: '/test1',
            regExp: /[0123456789]/,
          }),
          new CodePipelineCheckParameterAction({
            actionName: 'CheckParamter2',
            parameterName: '/test2',
            regExp: /[0123456789]/,
          }),
        ],
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
