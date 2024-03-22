import * as path from 'path';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ActionCategory, CommonActionProps, IStage, ActionBindOptions, ActionConfig } from 'aws-cdk-lib/aws-codepipeline';
import { Action } from 'aws-cdk-lib/aws-codepipeline-actions';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

import { ChannelTypes } from './channel-types';

export interface SlackApprovalActionProps extends CommonActionProps {
  readonly slackBotToken: string;
  readonly slackSigningSecret: string;
  readonly slackChannel?: string;
  readonly slackChannelId?: string;
  readonly slackChannelTypes?: ChannelTypes[];
  readonly slackBotName?: string;
  readonly slackBotIcon?: string;
  readonly additionalInformation?: string;
  readonly externalEntityLink?: string;
}

export class SlackApprovalAction extends Action {
  public constructor(private props: SlackApprovalActionProps) {
    super({
      ...props,
      category: ActionCategory.APPROVAL,
      provider: 'Manual',
      artifactBounds: {
        minInputs: 0,
        maxInputs: 0,
        minOutputs: 0,
        maxOutputs: 0,
      },
    });

    this.props = props;
  }

  protected bound(scope: Construct, stage: IStage, options: ActionBindOptions): ActionConfig {
    const environment: Record<string, string> = {
      SLACK_BOT_TOKEN: this.props.slackBotToken,
      SLACK_SIGNING_SECRET: this.props.slackSigningSecret,
      SLACK_CHANNEL_TYPES: (this.props.slackChannelTypes || [ChannelTypes.PUBLIC]).join(','),
    };

    if (this.props.slackChannel) {
      environment.SLACK_CHANNEL = this.props.slackChannel;
    }

    if (this.props.slackChannelId) {
      environment.SLACK_CHANNEL_ID = this.props.slackChannelId;
    }

    if (this.props.slackBotName) {
      environment.SLACK_BOT_NAME = this.props.slackBotName;
    }

    if (this.props.slackBotIcon) {
      environment.SLACK_BOT_ICON = this.props.slackBotIcon;
    }

    const approvalRequester = new Function(scope, 'SlackApprovalRequesterFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'approval-requester')),
      environment,
    });

    const topic = new Topic(scope, 'SlackApprovalTopic');
    topic.grantPublish(options.role);
    topic.addSubscription(new LambdaSubscription(approvalRequester));

    const approvalHandler = new Function(scope, 'SlackApprovalHandlerFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'approval-handler')),
      environment,
    });

    const api = new RestApi(scope, 'SlackApprovalApi');
    api.root.addProxy({
      defaultIntegration: new LambdaIntegration(approvalHandler),
    });

    approvalHandler.addToRolePolicy(
      new PolicyStatement({
        actions: ['codepipeline:PutApprovalResult'],
        resources: [`${stage.pipeline.pipelineArn}/${stage.stageName}/${this.props.actionName}`],
      }),
    );

    return {
      configuration: {
        NotificationArn: topic.topicArn,
        CustomData: this.props.additionalInformation,
        ExternalEntityLink: this.props.externalEntityLink,
      },
    };
  }
}
