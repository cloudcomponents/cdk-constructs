import * as path from 'path';
import { Construct, Token } from '@aws-cdk/cdk';
import {
  Action,
  ActionCategory,
  CommonActionProps,
  IStage
} from '@aws-cdk/aws-codepipeline-api';
import { ITopic, Topic } from '@aws-cdk/aws-sns';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface SlackApprovalActionProps extends CommonActionProps {
  slackBotToken: string;
  slackSigningSecret: string;
  slackChannel: string;
  slackBotName?: string;
  slackBotIcon?: string;
  additionalInformation?: string;
  externalEntityLink?: string;
}

export class SlackApprovalAction extends Action {
  private readonly props: SlackApprovalActionProps;
  private topic: ITopic;

  constructor(props: SlackApprovalActionProps) {
    super({
      ...props,
      category: ActionCategory.Approval,
      provider: 'Manual',
      artifactBounds: {
        minInputs: 0,
        maxInputs: 0,
        minOutputs: 0,
        maxOutputs: 0
      },
      configuration: new Token(() => this.actionConfiguration())
    });

    this.props = props;
  }

  protected bind(stage: IStage, scope: Construct): void {
    const environment = {
      SLACK_BOT_TOKEN: this.props.slackBotToken,
      SLACK_SIGNING_SECRET: this.props.slackSigningSecret,
      SLACK_CHANNEL: this.props.slackChannel,
      SLACK_BOT_NAME: this.props.slackBotName || 'buildbot',
      SLACK_BOT_ICON: this.props.slackBotIcon || ':robot_face:'
    };

    const approvalRequester = new Function(
      scope,
      'SlackApprovalRequesterFunction',
      {
        runtime: Runtime.NodeJS810,
        handler: 'lib/approval-requester.handler',
        code: Code.asset(path.join(__dirname, '..', 'lambda', 'bundle.zip')),
        environment
      }
    );

    this.topic = new Topic(scope, 'SlackApprovalTopic');
    this.topic.grantPublish(stage.pipeline.role);
    this.topic.subscribeLambda(approvalRequester);

    const approvalHandler = new Function(
      scope,
      'SlackApprovalHandlerFunction',
      {
        runtime: Runtime.NodeJS810,
        handler: 'lib/approval-handler.handler',
        code: Code.asset(path.join(__dirname, '..', 'lambda', 'bundle.zip')),
        environment
      }
    );

    const api = new RestApi(scope, 'SlackApprovalApi');
    api.root.addProxy({
      defaultIntegration: new LambdaIntegration(approvalHandler)
    });

    approvalHandler.addToRolePolicy(
      new PolicyStatement()
        .addResource(
          `${stage.pipeline.pipelineArn}/${stage.stageName}/${
            this.props.actionName
          }`
        )
        .addActions('codepipeline:PutApprovalResult')
    );
  }

  private actionConfiguration(): any {
    return {
      NotificationArn: this.topic.topicArn,
      CustomData: this.props.additionalInformation,
      ExternalEntityLink: this.props.externalEntityLink
    };
  }
}
