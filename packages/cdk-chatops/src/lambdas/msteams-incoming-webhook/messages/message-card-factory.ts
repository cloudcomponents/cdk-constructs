import { MessageCard } from '../message-card';
import { SnsMessage } from '../sns-message';

import { PipelineExecutionMessage, StageExecutionMessage, ActionExecutionMessage } from './developer-tools';
import { MessageOptions } from './message';
import { RawMessage } from './raw-message';

export enum MessageSource {
  'CODE_PIPELINE' = 'aws.codepipeline',
  'CODE_COMMIT' = 'aws.codecommit',
}

export enum DetailType {
  'CODE_PIPELINE_STAGE_EXECUTION' = 'CodePipeline Stage Execution State Change',
  'CODE_PIPELINE_ACTION_EXECUTION' = 'CodePipeline Action Execution State Change',
  'CODE_PIPELINE_PIPELINE_EXECUTION' = 'CodePipeline Pipeline Execution State Change',
}

export interface MessageCardFactoryOptions extends MessageOptions {
  showRawMessages?: boolean;
}

export class MessageCardFactory {
  public static async createNotificationCard(snsMessage: SnsMessage, options: MessageCardFactoryOptions): Promise<MessageCard> {
    const { showRawMessages = false, ...messageOptions } = options;

    const message = (() => {
      if (showRawMessages) {
        return new RawMessage(snsMessage, messageOptions);
      }

      switch (snsMessage.detailType as DetailType) {
        case DetailType.CODE_PIPELINE_PIPELINE_EXECUTION: {
          return new PipelineExecutionMessage(snsMessage, messageOptions);
        }
        case DetailType.CODE_PIPELINE_STAGE_EXECUTION: {
          return new StageExecutionMessage(snsMessage, messageOptions);
        }
        case DetailType.CODE_PIPELINE_ACTION_EXECUTION: {
          return new ActionExecutionMessage(snsMessage, messageOptions);
        }
        default: {
          return new RawMessage(snsMessage, messageOptions);
        }
      }
    })();

    return message.render();
  }

  public static createErrorCard(error: Error, options: MessageCardFactoryOptions): void {
    console.log(error, options);
    return;
  }
}
