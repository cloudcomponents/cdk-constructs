![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-developer-tools-notifications

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-components.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-components)

> #slack / msteams / email notifications for developer tools: CodeCommit, CodeBuild, CodeDeploy, CodePipeline

## Install

```bash
npm i @cloudcomponents/cdk-developer-tools-notifications
```

## How to use

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import {
  CodeCommitSourceAction,
  ManualApprovalAction,
} from '@aws-cdk/aws-codepipeline-actions';
import {
  RepositoryNotificationRule,
  PipelineNotificationRule,
  RepositoryEvent,
  PipelineEvent,
  SlackChannel,
  MSTeamsIncomingWebhook,
} from '@cloudcomponents/cdk-developer-tools-notifications';
import { SlackChannelConfiguration } from '@cloudcomponents/cdk-chatops';

export class NotificationsStack extends Stack {
  public constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const slackChannel = new SlackChannelConfiguration(this, 'SlackChannel', {
      slackWorkspaceId: process.env.SLACK_WORKSPACE_ID as string,
      configurationName: 'notifications',
      slackChannelId: process.env.SLACK_CHANNEL_ID as string,
    });

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'notifications-repository',
    });

    new RepositoryNotificationRule(this, 'RepoNotifications', {
      name: 'notifications-repository',
      repository,
      events: [
        RepositoryEvent.COMMENTS_ON_COMMITS,
        RepositoryEvent.PULL_REQUEST_CREATED,
        RepositoryEvent.PULL_REQUEST_MERGED,
      ],
      targets: [
        new SlackChannel(slackChannel),
        new MSTeamsIncomingWebhook(process.env.INCOMING_WEBHOOK_URL as string),
      ],
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
    });

    const approvalAction = new ManualApprovalAction({
      actionName: 'Approval',
    });

    const pipeline = new Pipeline(this, 'Pipeline', {
      pipelineName: 'notifications-pipeline',
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

    new PipelineNotificationRule(this, 'PipelineNotificationRule', {
      name: 'pipeline-notification',
      pipeline,
      events: [
        PipelineEvent.PIPELINE_EXECUTION_STARTED,
        PipelineEvent.PIPELINE_EXECUTION_FAILED,
        PipelineEvent.PIPELINE_EXECUTION_SUCCEEDED,
        PipelineEvent.MANUAL_APPROVAL_NEEDED,
        PipelineEvent.MANUAL_APPROVAL_SUCCEEDED,
        PipelineEvent.MANUAL_APPROVAL_FAILED,
      ],
      targets: [
        new SlackChannel(slackChannel),
        new MSTeamsIncomingWebhook(process.env.INCOMING_WEBHOOK_URL as string),
      ],
    });
  }
}
```

## License

[MIT](../../LICENSE)
