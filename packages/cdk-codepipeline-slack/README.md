![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-codepipeline-slack

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-components.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-components)

> Cdk component that provisions a #slack approval workflow and notification messages on codepipeline state changes

![Approval Workflow](/packages/cdk-codepipeline-slack/assets/approval_workflow.png?raw=true 'Approval Workflow')

![Review Dialog](/packages/cdk-codepipeline-slack/assets/review_dialog.png?raw=true 'Review Dialog')

## Install

```bash
npm install --save @cloudcomponents/cdk-codepipeline-slack
```

## How to use

```javascript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction, CodeBuildAction } from '@aws-cdk/aws-codepipeline-actions';
import { PipelineProject } from '@aws-cdk/aws-codebuild';

import {
    SlackApprovalAction,
    SlackNotifier,
} from '@cloudcomponents/cdk-codepipeline-slack';

export class CodePipelineSlackApprovalStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact
    });

    const project = new PipelineProject(this, 'MyProject');

    const buildAction = new CodeBuildAction({
      actionName: 'CodeBuild',
      project,
      input: sourceArtifact,
    });

    const slackBotToken = process.env.SLACK_BOT_TOKEN as string;
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET as string;
    const slackChannelId = process.env.SLACK_CHANNEL_ID as string;

    const approvalAction = new SlackApprovalAction({
      actionName: 'SlackApproval',
      slackBotToken,
      slackSigningSecret,
      slackChannelId,
      externalEntityLink: 'http://cloudcomponents.org',
      additionalInformation:
        'Would you like to promote the build to production?'
    });

    const pipeline = new Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction]
        },
        {
          stageName: 'Build',
          actions: [buildAction]
        },
        {
          stageName: 'Approval',
          actions: [approvalAction]
        }
      ]
    });

    new SlackNotifier(this, 'SlackNotifier', {
      pipeline,
      slackBotToken,
      slackSigningSecret,
      slackChannel,
    });
  }
}
```

## Slack App Settings

Create an app that’s just for your workspace

### OAuth & Permissions

Grant the `channels::history`-Scope to the Bot in your app and Add the Bot to the configured Slack-Channel

Select Permission Scopes:

![OAuth Scopes](/packages/cdk-codepipeline-slack/assets/oauth_scope.png?raw=true 'OAuth scopes')

### Interactive Components

Enter the url of your api from the AWS Api Gateway and append `/slack/actions`:

![Interactive Components](/packages/cdk-codepipeline-slack/assets/interactive_components.png?raw=true 'Interactive Components')

## License

[MIT](../../LICENSE)
