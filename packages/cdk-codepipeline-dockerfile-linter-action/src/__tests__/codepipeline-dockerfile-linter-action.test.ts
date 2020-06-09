import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { CodePipelineDockerfileLinterAction } from '../codepipeline-dockerfile-linter-action';

test('default setup', (): void => {
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
        stageName: 'Audit',
        actions: [
          new CodePipelineDockerfileLinterAction({
            actionName: 'DockerfileLinter',
            input: sourceArtifact,
          }),
        ],
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot();
});
