import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { CodepipelineCheckParameterAction } from '@cloudcomponents/cdk-codepipeline-check-parameter-action';

export class CodepipelineCheckParameterActionStack extends Stack {
    public constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        const repository = new Repository(this, 'Repository', {
            repositoryName: 'MyRepositoryName',
            description: 'Some description.', // optional property
        });

        const sourceArtifact = new Artifact();

        const sourceAction = new CodeCommitSourceAction({
            actionName: 'CodeCommit',
            repository,
            output: sourceArtifact,
            branch: 'master',
        });

        const checkAction = new CodepipelineCheckParameterAction({
            actionName: 'Check',
            parameterName: '/test',
            regExp: /^The.*Spain$/,
            echo: true,
        });

        new Pipeline(this, 'MyPipeline', {
            pipelineName: 'MyPipeline',
            stages: [
                {
                    stageName: 'Source',
                    actions: [sourceAction],
                },
                {
                    stageName: 'Check',
                    actions: [checkAction],
                },
            ],
        });
    }
}
