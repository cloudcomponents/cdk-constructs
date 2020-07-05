import * as path from 'path';
import { Construct } from '@aws-cdk/core';
import {
  ActionCategory,
  CommonActionProps,
  IStage,
  ActionBindOptions,
  ActionConfig,
} from '@aws-cdk/aws-codepipeline';
import { Action } from '@aws-cdk/aws-codepipeline-actions';
import { Topic } from '@aws-cdk/aws-sns';
import { LambdaSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface SlackApprovalActionProps extends CommonActionProps {
  readonly slackBotToken: string;
  readonly slackSigningSecret: string;
  readonly slackChannel?: string;
  readonly slackChannelId?: string;
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

  protected bound(
    scope: Construct,
    stage: IStage,
    options: ActionBindOptions,
  ): ActionConfig {
    const environment = {
      SLACK_BOT_TOKEN: this.props.slackBotToken,
      SLACK_SIGNING_SECRET: this.props.slackSigningSecret,
      SLACK_CHANNEL: this.props.slackChannel as string,
      SLACK_CHANNEL_ID: this.props.slackChannelId as string,
      SLACK_BOT_NAME: this.props.slackBotName || 'buildbot',
      SLACK_BOT_ICON: this.props.slackBotIcon || ':robot_face:',
    };

    const approvalRequester = new Function(
      scope,
      'SlackApprovalRequesterFunction',
      {
        runtime: Runtime.NODEJS_10_X,
        handler: 'index.handler',
        code: Code.asset(path.join(__dirname, 'lambdas', 'approval-requester')),
        environment,
      },
    );

    const topic = new Topic(scope, 'SlackApprovalTopic');
    topic.grantPublish(options.role);
    topic.addSubscription(new LambdaSubscription(approvalRequester));

    const approvalHandler = new Function(
      scope,
      'SlackApprovalHandlerFunction',
      {
        runtime: Runtime.NODEJS_10_X,
        handler: 'index.handler',
        code: Code.fromAsset(
          path.join(__dirname, 'lambdas', 'approval-handler'),
        ),
        environment,
      },
    );

    const api = new RestApi(scope, 'SlackApprovalApi');
    api.root.addProxy({
      defaultIntegration: new LambdaIntegration(approvalHandler),
    });

    approvalHandler.addToRolePolicy(
      new PolicyStatement({
        actions: ['codepipeline:PutApprovalResult'],
        resources: [
          `${stage.pipeline.pipelineArn}/${stage.stageName}/${this.props.actionName}`,
        ],
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
