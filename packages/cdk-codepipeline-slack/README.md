[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-codepipeline-slack 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-codepipeline-slack)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-codepipeline-slack/)
[![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk)

> Cdk component that provisions a #slack approval workflow and notification messages on codepipeline state changes

![Approval Workflow](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/packages/cdk-codepipeline-slack/assets/approval_workflow.png)

![Review Dialog](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/packages/cdk-codepipeline-slack/assets/review_dialog.png)

## Install
TypeScript/JavaScript:

```bash
npm install --save @cloudcomponents/cdk-codepipeline-slack
```

Python:

```bash
pip install cloudcomponents.cdk-codepipeline-slack
```

## How to use

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import {
  CodeCommitSourceAction,
  CodeBuildAction,
} from '@aws-cdk/aws-codepipeline-actions';
import { PipelineProject } from '@aws-cdk/aws-codebuild';

import {
  SlackApprovalAction,
  SlackNotifier,
} from '@cloudcomponents/cdk-codepipeline-slack';

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

    const project = new PipelineProject(this, 'MyProject');

    const buildAction = new CodeBuildAction({
      actionName: 'CodeBuild',
      project,
      input: sourceArtifact,
    });

    const slackBotToken = process.env.SLACK_BOT_TOKEN as string;
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET as string;
    const slackChannel = process.env.SLACK_CHANNEL_NAME as string;

    const approvalAction = new SlackApprovalAction({
      actionName: 'SlackApproval',
      slackBotToken,
      slackSigningSecret,
      slackChannel,
      externalEntityLink: 'http://cloudcomponents.org',
      additionalInformation:
        'Would you like to promote the build to production?',
    });

    const pipeline = new Pipeline(this, 'MyPipeline', {
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

![OAuth Scopes](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/packages/cdk-codepipeline-slack/assets/oauth_scope.png)

### Interactive Components

Enter the url of your api from the AWS Api Gateway and append `/slack/actions`:

![Interactive Components](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/packages/cdk-codepipeline-slack/assets/interactive_components.png)

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-codepipeline-slack/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-codepipeline-slack/LICENSE)
