import * as path from 'path';
import { IPipeline } from '@aws-cdk/aws-codepipeline';
import { Rule } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';

export interface SlackNotifierProps {
  readonly slackBotToken: string;
  readonly slackSigningSecret: string;
  readonly slackChannel?: string;
  readonly slackChannelId?: string;
  readonly slackBotName?: string;
  readonly slackBotIcon?: string;
  readonly pipeline: IPipeline;
  readonly stageNames?: string[];
}

export class SlackNotifier extends Construct {
  protected environment: Record<string, string>;

  constructor(scope: Construct, id: string, props: SlackNotifierProps) {
    super(scope, id);

    const { slackBotToken, slackSigningSecret, slackChannel, slackChannelId, slackBotName, slackBotIcon, pipeline, stageNames } = props;

    this.environment = {
      SLACK_BOT_TOKEN: slackBotToken,
      SLACK_SIGNING_SECRET: slackSigningSecret,
      SLACK_CHANNEL: slackChannel || '',
      SLACK_CHANNEL_ID: slackChannelId || '',
    };

    if (slackBotName) {
      this.environment.SLACK_BOT_NAME = slackBotName;
    }

    if (slackBotIcon) {
      this.environment.SLACK_BOT_ICON = slackBotIcon;
    }

    const notifier = new Function(scope, 'SlackNotifierFunction', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.asset(path.join(__dirname, 'lambdas', 'notifier')),
      environment: this.environment,
    });
    notifier.addToRolePolicy(
      new PolicyStatement({
        resources: [pipeline.pipelineArn],
        actions: ['codepipeline:GetPipelineState', 'codepipeline:GetPipelineExecution'],
      }),
    );

    pipeline.onStateChange('SlackPipelineNotifierRule', {
      target: new LambdaFunction(notifier),
    });

    const stageRule = new Rule(this, 'SlackStageNotifierRule');

    stageRule.addTarget(new LambdaFunction(notifier));

    stageRule.addEventPattern({
      source: ['aws.codepipeline'],
      resources: [pipeline.pipelineArn],
      detailType: ['CodePipeline Stage Execution State Change'],
    });

    if (stageNames) {
      stageRule.addEventPattern({
        detail: {
          stage: stageNames,
        },
      });
    }
  }

  protected validate(this: SlackNotifier): string[] {
    if (this.environment.SLACK_CHANNEL && this.environment.SLACK_CHANNEL_ID) {
      return ['Redundant Configuration: Please configure slackChannel by id (prop slackChannelId) OR name (prop slackChannel)'];
    }
    if (!this.environment.SLACK_CHANNEL && !this.environment.SLACK_CHANNEL_ID) {
      return ['Missing Configuration: Please configure slackChannel by id (prop slackChannelId) or name (prop slackChannel)'];
    }
    return [];
  }
}
