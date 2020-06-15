import { Construct } from '@aws-cdk/core';
import { Topic, ITopic } from '@aws-cdk/aws-sns';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import {
  ISlackChannelConfiguration,
  MSTeamsIncomingWebhookConfiguration,
} from '@cloudcomponents/cdk-chatops';

import { INotificationRule } from './notification-rules';

export interface NotificationTargetProperty {
  targetType: TargetType.SNS | TargetType.AWSChatbotSlack;
  targetAddress: string;
}

export interface INotificationTarget {
  bind(scope: Construct, rule: INotificationRule): NotificationTargetProperty;
}

export class SnsTopic implements INotificationTarget {
  constructor(private readonly topic: ITopic) {}

  public bind(_scope: Construct): NotificationTargetProperty {
    this.topic.grantPublish(
      new ServicePrincipal('codestar-notifications.amazonaws.com'),
    );

    return {
      targetType: TargetType.SNS,
      targetAddress: this.topic.topicArn,
    };
  }
}

export class SlackChannel implements INotificationTarget {
  constructor(private readonly channel: ISlackChannelConfiguration) {}

  public bind(_scope: Construct): NotificationTargetProperty {
    return {
      targetType: TargetType.AWSChatbotSlack,
      targetAddress: this.channel.configurationArn,
    };
  }
}

export class MSTeamsIncomingWebhook implements INotificationTarget {
  constructor(private readonly webhook: MSTeamsIncomingWebhookConfiguration) {}

  public bind(scope: Construct): NotificationTargetProperty {
    const msTeamsTopic = new Topic(scope, `${scope.node.id}MSTeamsTopic`);

    msTeamsTopic.grantPublish(
      new ServicePrincipal('codestar-notifications.amazonaws.com'),
    );

    this.webhook.addEventSource(new SnsEventSource(msTeamsTopic));

    return {
      targetType: TargetType.SNS,
      targetAddress: msTeamsTopic.topicArn,
    };
  }
}

export enum TargetType {
  SNS = 'SNS',
  AWSChatbotSlack = 'AWSChatbotSlack',
}
