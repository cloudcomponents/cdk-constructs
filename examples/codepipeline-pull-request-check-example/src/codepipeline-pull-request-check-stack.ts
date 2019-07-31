import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import {
    CodeCommitSourceAction,
    CodeBuildAction,
} from '@aws-cdk/aws-codepipeline-actions';
import { PipelineProject, BuildSpec } from '@aws-cdk/aws-codebuild';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';

export class CodepipelinePullRequestCheckStack extends Stack {
    public constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        const repository = new Repository(this, 'Repository', {
            repositoryName: 'MyRepositoryName',
            description: 'Some description.', // optional property
        });

        new PullRequestCheck(this, 'PullRequestCheck', {
            repository,
            buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
        });

        const sourceArtifact = new Artifact();

        const sourceAction = new CodeCommitSourceAction({
            actionName: 'CodeCommit',
            repository,
            output: sourceArtifact,
        });

        const project = new PipelineProject(this, 'MyProject');

        const buildAction = new CodeBuildAction({
            actionName: 'CodeBuild',
            project,
            input: sourceArtifact,
        });

        new Pipeline(this, 'MyPipeline', {
            pipelineName: 'MyPipeline',
            stages: [
                {
                    stageName: 'Source',
                    actions: [sourceAction],
                },
                {
                    stageName: 'Build',
                    actions: [buildAction],
                },
            ],
        });
    }
}
