import { CodePipelineMergeAction } from '@cloudcomponents/cdk-codepipeline-merge-action';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Pipeline, Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { CodeCommitSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';

export class CodePipelineMergeActionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'merge-action-repository',
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
      branch: 'next',
    });

    const mergeAction = new CodePipelineMergeAction({
      actionName: 'Merge',
      repository,
      sourceCommitSpecifier: 'next',
      destinationCommitSpecifier: 'master',
    });

    new Pipeline(this, 'Pipeline', {
      pipelineName: 'merge-action-pipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Merge',
          actions: [mergeAction],
        },
      ],
    });
  }
}
