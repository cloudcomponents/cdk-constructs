import * as path from 'path';
import { Construct } from '@aws-cdk/cdk';
import { ManualApprovalAction } from '@aws-cdk/aws-codepipeline';
import { IStage } from '@aws-cdk/aws-codepipeline-api';
import { Topic } from '@aws-cdk/aws-sns';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface SlackApprovalProps {
  slackBotToken: string;
  slackSigningSecret: string;
  slackChannel: string;
  slackBotName?: string;
  slackBotIcon?: string;
  additionalInformation?: string;
}

export class SlackApproval extends Construct {
  private approvalRequester: Function;
  private approvalHandler: Function;
  private additionalInformation?: string;

  constructor(parent: Construct, id: string, props: SlackApprovalProps) {
    super(parent, id);

    this.additionalInformation = props.additionalInformation;

    const environment = {
      SLACK_BOT_TOKEN: props.slackBotToken,
      SLACK_SIGNING_SECRET: props.slackSigningSecret,
      SLACK_CHANNEL: props.slackChannel,
      SLACK_BOT_NAME: props.slackBotName || 'buildbot',
      SLACK_BOT_ICON: props.slackBotIcon || ':robot_face:'
    };

    this.approvalRequester = new Function(
      this,
      'SlackApprovalRequesterFunction',
      {
        runtime: Runtime.NodeJS810,
        handler: 'lib/approval-requester.handler',
        code: Code.asset(path.join(__dirname, '..', 'lambda', 'bundle.zip')),
        environment
      }
    );

    this.approvalHandler = new Function(this, 'SlackApprovalHandlerFunction', {
      runtime: Runtime.NodeJS810,
      handler: 'lib/approval-handler.handler',
      code: Code.asset(path.join(__dirname, '..', 'lambda', 'bundle.zip')),
      environment
    });

    const api = new RestApi(this, 'SlackApprovalApi');
    api.root.addProxy({
      defaultIntegration: new LambdaIntegration(this.approvalHandler)
    });
  }

  public addToPipeline(stage: IStage, name: string) {
    const topic = new Topic(this, 'SlackApprovalTopic');
    topic.grantPublish(stage.pipeline.role);
    topic.subscribeLambda(this.approvalRequester);

    this.approvalHandler.addToRolePolicy(
      new PolicyStatement()
        .addResource(`${stage.pipeline.pipelineArn}/${stage.name}/${name}`)
        .addActions('codepipeline:PutApprovalResult')
    );

    return new ManualApprovalAction(this, name, {
      notificationTopic: topic,
      stage: stage,
      additionalInformation: this.additionalInformation
    });
  }
}
