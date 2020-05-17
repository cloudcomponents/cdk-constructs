import { ITopic } from '@aws-cdk/aws-sns';

import { ISlackChannelConfiguration } from '@cloudcomponents/cdk-chatops';

export interface NotificationTargetProperty {
    targetType: TargetType.SNS | TargetType.AWSChatbotSlack;
    targetAddress: string;
}

export interface INotificationTarget {
    bind(): NotificationTargetProperty;
}

export class SnsTopic implements INotificationTarget {
    constructor(private readonly topic: ITopic) {}

    public bind(): NotificationTargetProperty {
        return {
            targetType: TargetType.SNS,
            targetAddress: this.topic.topicArn,
        };
    }
}

export class SlackChannel implements INotificationTarget {
    constructor(private readonly channel: ISlackChannelConfiguration) {}

    public bind(): NotificationTargetProperty {
        return {
            targetType: TargetType.AWSChatbotSlack,
            targetAddress: this.channel.configurationArn,
        };
    }
}

export enum TargetType {
    SNS = 'SNS',
    AWSChatbotSlack = 'AWSChatbotSlack',
}
