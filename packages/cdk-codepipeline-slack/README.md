# @cloudcomponents/cdk-codepipeline-slack

> Cdk component that provisions a #slack approval workflow

![Approval Workflow](/packages/cdk-codepipeline-slack/assets/approval_workflow.png?raw=true 'Approval Workflow')

![Review Dialog](/packages/cdk-codepipeline-slack/assets/review_dialog.png?raw=true 'Review Dialog')

## Install

```bash
npm install --save @cloudcomponents/cdk-codepipeline-slack
```

## How to use

```javascript
import { App, Stack, StackProps } from '@aws-cdk/cdk';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline } from '@aws-cdk/aws-codepipeline';
import { PipelineProject } from '@aws-cdk/aws-codebuild';

import { SlackApprovalAction } from '@cloudcomponents/cdk-codepipeline-slack';

export class CodepipelineSlackApprovalStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const pipeline = new Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline'
    });

    const sourceStage = pipeline.addStage({ name: 'Source' });

    const repo = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
      description: 'Some description.' // optional property
    });
    const sourceAction = repo.toCodePipelineSourceAction({
      actionName: 'CodeCommit'
    });
    sourceStage.addAction(sourceAction);

    const buildStage = pipeline.addStage({ name: 'Build' });

    const project = new PipelineProject(this, 'MyProject');
    const buildAction = project.toCodePipelineBuildAction({
      actionName: 'CodeBuild',
      inputArtifact: sourceAction.outputArtifact
    });
    buildStage.addAction(buildAction);

    const approvalStage = pipeline.addStage({ name: 'Approval' });

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
        'Would you like to promote the build to production?'
    });
    approvalStage.addAction(approvalAction);
  }
}
```

## Slack App Settings

Create an app that’s just for your workspace

### OAuth & Permissions

Select Permission Scopes:

![OAuth Scopes](/packages/cdk-codepipeline-slack/assets/oauth_scope.png?raw=true 'OAuth scopes')

### Interactive Components

Enter the url of your api:

![Interactive Components](/packages/cdk-codepipeline-slack/assets/interactive_components.png?raw=true 'Interactive Components')

## License

[MIT](../../LICENSE)
