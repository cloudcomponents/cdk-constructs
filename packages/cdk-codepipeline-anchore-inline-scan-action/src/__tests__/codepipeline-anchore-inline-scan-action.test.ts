import { Repository } from '@aws-cdk/aws-codecommit';
import { Artifact, Pipeline } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { CodePipelineAnchoreInlineScanAction } from '../codepipeline-anchore-inline-scan-action';

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
          new CodePipelineAnchoreInlineScanAction({
            actionName: 'VulnScan',
            input: sourceArtifact,
          }),
        ],
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot();
});
