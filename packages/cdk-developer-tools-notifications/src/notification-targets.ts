import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Topic, ITopic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { ISlackChannelConfiguration, MSTeamsIncomingWebhookConfiguration } from '@cloudcomponents/cdk-chatops';

import { INotificationRule } from './notification-rules';

export interface NotificationTargetProperty {
  readonly targetType: TargetType.SNS | TargetType.AWS_CHATBOT_SLACK;
  readonly targetAddress: string;
}

export interface INotificationTarget {
  bind(scope: Construct, rule: INotificationRule): NotificationTargetProperty;
}

export class SnsTopic implements INotificationTarget {
  constructor(private readonly topic: ITopic) {}

  public bind(_scope: Construct, _rule: INotificationRule): NotificationTargetProperty {
    this.topic.grantPublish(new ServicePrincipal('codestar-notifications.amazonaws.com'));

    return {
      targetType: TargetType.SNS,
      targetAddress: this.topic.topicArn,
    };
  }
}

export class SlackChannel implements INotificationTarget {
  constructor(private readonly channel: ISlackChannelConfiguration) {}

  public bind(_scope: Construct, _rule: INotificationRule): NotificationTargetProperty {
    return {
      targetType: TargetType.AWS_CHATBOT_SLACK,
      targetAddress: this.channel.configurationArn,
    };
  }
}

export class MSTeamsIncomingWebhook implements INotificationTarget {
  constructor(private readonly webhook: MSTeamsIncomingWebhookConfiguration) {}

  public bind(scope: Construct, _rule: INotificationRule): NotificationTargetProperty {
    const msTeamsTopic = new Topic(scope, `${scope.node.id}MSTeamsTopic`);

    msTeamsTopic.grantPublish(new ServicePrincipal('codestar-notifications.amazonaws.com'));

    this.webhook.addEventSource(new SnsEventSource(msTeamsTopic));

    return {
      targetType: TargetType.SNS,
      targetAddress: msTeamsTopic.topicArn,
    };
  }
}

export enum TargetType {
  SNS = 'SNS',
  AWS_CHATBOT_SLACK = 'AWSChatbotSlack',
}
