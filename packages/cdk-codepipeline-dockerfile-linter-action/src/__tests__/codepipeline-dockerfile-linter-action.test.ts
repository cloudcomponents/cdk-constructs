import { Stack } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CodeCommitSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
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
