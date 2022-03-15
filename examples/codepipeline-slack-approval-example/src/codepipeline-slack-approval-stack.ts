import { SlackApprovalAction, SlackNotifier } from '@cloudcomponents/cdk-codepipeline-slack';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Pipeline, Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { CodeCommitSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';

export class CodePipelineSlackApprovalStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
    });

    if (typeof process.env.SLACK_BOT_TOKEN === 'undefined') {
      throw new Error('environment variable SLACK_BOT_TOKEN undefined');
    }
    const slackBotToken = process.env.SLACK_BOT_TOKEN;

    if (typeof process.env.SLACK_SIGNING_SECRET === 'undefined') {
      throw new Error('environment variable SLACK_SIGNING_SECRET undefined');
    }
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

    if (typeof process.env.SLACK_CHANNEL_NAME === 'undefined') {
      throw new Error('environment variable SLACK_CHANNEL_NAME undefined');
    }
    const slackChannel = process.env.SLACK_CHANNEL_NAME;

    const approvalAction = new SlackApprovalAction({
      actionName: 'SlackApproval',
      slackBotToken,
      slackSigningSecret,
      slackChannel,
      externalEntityLink: 'http://cloudcomponents.org',
      additionalInformation: 'Would you like to promote the build to production?',
    });

    const pipeline = new Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Approval',
          actions: [approvalAction],
        },
      ],
    });

    new SlackNotifier(this, 'SlackNotifier', {
      pipeline,
      slackBotToken,
      slackSigningSecret,
      slackChannel,
    });
  }
}
