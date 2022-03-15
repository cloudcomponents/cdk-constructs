import { CodePipelineAnchoreInlineScanAction } from '@cloudcomponents/cdk-codepipeline-anchore-inline-scan-action';
import { CodePipelineDockerfileLinterAction } from '@cloudcomponents/cdk-codepipeline-dockerfile-linter-action';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Pipeline, Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { CodeCommitSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';

export class ContainerAuditStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'container-audit-repository',
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
      branch: 'master',
    });

    const linterAction = new CodePipelineDockerfileLinterAction({
      actionName: 'Linter',
      input: sourceArtifact,
    });

    const vulnScanAction = new CodePipelineAnchoreInlineScanAction({
      actionName: 'VulnScan',
      input: sourceArtifact,
    });

    new Pipeline(this, 'Pipeline', {
      pipelineName: 'container-audit-pipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Audit',
          actions: [linterAction, vulnScanAction],
        },
      ],
    });
  }
}
