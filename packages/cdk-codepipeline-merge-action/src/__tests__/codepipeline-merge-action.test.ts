import { Repository } from '@aws-cdk/aws-codecommit';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { CodePipelineMergeAction } from '../codepipeline-merge-action';

test('default setup', (): void => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
    description: 'Some description.',
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
        stageName: 'Merge',
        actions: [
          new CodePipelineMergeAction({
            actionName: 'Merge',
            repository,
            sourceCommitSpecifier: 'next',
            destinationCommitSpecifier: 'master',
          }),
        ],
      },
    ],
  });

  // THEN
  expect(stack).toMatchCdkSnapshot();
});
