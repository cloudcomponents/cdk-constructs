import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import {
    CodeCommitSourceAction,
    CodeBuildAction,
} from '@aws-cdk/aws-codepipeline-actions';
import { PipelineProject } from '@aws-cdk/aws-codebuild';

import { SlackApprovalAction } from '@cloudcomponents/cdk-codepipeline-slack';

export class CodepipelineSlackApprovalStack extends Stack {
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
        });

        const project = new PipelineProject(this, 'MyProject');

        const buildAction = new CodeBuildAction({
            actionName: 'CodeBuild',
            project,
            input: sourceArtifact,
        });

        const slackBotToken = process.env.SLACK_BOT_TOKEN as string;
        const slackSigningSecret = process.env.SLACK_SIGNING_SECRET as string;
        const slackChannel = process.env.SLACK_CHANNEL as string;

        const approvalAction = new SlackApprovalAction({
            actionName: 'SlackApproval',
            slackBotToken,
            slackSigningSecret,
            slackChannel,
            externalEntityLink: 'http://cloudcomponents.org',
            additionalInformation:
                'Would you like to promote the build to production?',
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
                {
                    stageName: 'Approval',
                    actions: [approvalAction],
                },
            ],
        });
    }
}
