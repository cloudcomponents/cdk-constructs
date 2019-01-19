import { App, Stack, StackProps } from '@aws-cdk/cdk';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline } from '@aws-cdk/aws-codepipeline';
import { PipelineProject } from '@aws-cdk/aws-codebuild';

import { SlackApproval } from '@cloudcomponents/cdk-codepipeline-slack';

export class CodepipelineSlackApprovalStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const pipeline = new Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline'
    });

    const sourceStage = pipeline.addStage('Source');
    const buildStage = pipeline.addStage('Build');
    const approvalStage = pipeline.addStage('Approval');

    const repo = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
      description: 'Some description.' // optional property
    });
    repo.addToPipeline(sourceStage, 'CodeCommit');

    const project = new PipelineProject(this, 'MyProject');
    project.addToPipeline(buildStage, 'CodebBuild');

    const slackBotToken = process.env.SLACK_BOT_TOKEN as string;
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET as string;
    const slackChannel = process.env.SLACK_CHANNEL as string;

    const approval = new SlackApproval(this, 'SlackApproval', {
      slackBotToken,
      slackSigningSecret,
      slackChannel,
      additionalInformation:
        'Would you like to promote the build to production?'
    });
    approval.addToPipeline(approvalStage, 'Approval');
  }
}
