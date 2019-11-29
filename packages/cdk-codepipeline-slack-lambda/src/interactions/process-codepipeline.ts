import { CodePipelineCloudWatchEvent } from 'aws-lambda';

import { Message } from './message-builder';
import { NotifierMessageBuilder } from './notifier-message-builder';
import { SlackBot } from './slack-bot';

const {
    SLACK_BOT_TOKEN,
    SLACK_CHANNEL_NAME,
    SLACK_BOT_NAME,
    SLACK_BOT_ICON,
} = process.env;

const bot = new SlackBot({
    token: SLACK_BOT_TOKEN as string,
    channelName: SLACK_CHANNEL_NAME as string,
    name: SLACK_BOT_NAME,
    icon: SLACK_BOT_ICON,
});

const messageCache: Record<string, Message> = {};

export const processCodepipeline = async (
    event: CodePipelineCloudWatchEvent,
): Promise<void> => {
    console.log(event);

    const notifierMessageBuilder = NotifierMessageBuilder.fromPipelineEvent(
        event,
    );

    //builder.updatePipelineEvent(event);

    const { message } = notifierMessageBuilder;

    if (message.ts) {
        bot.updateMessage(message.ts, message);
    }

    bot.postMessage(message);
};
