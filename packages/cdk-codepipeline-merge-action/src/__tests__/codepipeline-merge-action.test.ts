import { Stack } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CodeCommitSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
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
  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
