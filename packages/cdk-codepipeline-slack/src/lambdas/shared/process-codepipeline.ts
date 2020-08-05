import type { CodePipelineCloudWatchEvent } from 'aws-lambda';
import { CodePipeline } from 'aws-sdk';
import { NotifierMessageBuilder } from './notifier-message-builder';
import { SlackBot } from './slack-bot';

const { SLACK_BOT_TOKEN, SLACK_CHANNEL, SLACK_CHANNEL_ID, SLACK_BOT_NAME, SLACK_BOT_ICON } = process.env;

const bot = new SlackBot({
  token: SLACK_BOT_TOKEN as string,
  channelName: SLACK_CHANNEL as string,
  channelId: SLACK_CHANNEL_ID,
  name: SLACK_BOT_NAME,
  icon: SLACK_BOT_ICON,
});

const codePipeline = new CodePipeline({ apiVersion: '2015-07-09' });

export const processCodePipeline = async (event: CodePipelineCloudWatchEvent): Promise<void> => {
  const executionId = event.detail['execution-id'];
  const isStateChange = event['detail-type'] === 'CodePipeline Stage Execution State Change';

  if (!isStateChange) {
    return;
  }

  const pipelineState = await codePipeline.getPipelineState({ name: event.detail.pipeline }).promise();

  const { pipelineExecution } = await codePipeline
    .getPipelineExecution({
      pipelineName: event.detail.pipeline,
      pipelineExecutionId: executionId,
    })
    .promise();

  const notifierMessageBuilder = NotifierMessageBuilder.fromPipelineEventAndPipelineState(event, pipelineState, pipelineExecution);

  //  builder.updatePipelineEvent(event);

  const existingMessage = await bot.findMessageForExecutionId(executionId);

  const { message } = notifierMessageBuilder;

  if (existingMessage?.ts) {
    message.ts = existingMessage.ts;
    await bot.updateMessage(existingMessage.ts, message);
  } else {
    await bot.postMessage(message);
  }
};
