import { SnsMessage } from '../sns-message';
import { MessageCard } from '../message-card';

import { Message } from './message';
import { DefaultMessage } from './default-message';
import { CodePipelineMessage } from './codepipeline-message';

export enum MessageSource {
  'CODE_PIPELINE' = 'aws.codepipeline',
  'DEFAULT' = 'default',
}

export const createMessage = (snsMessage: SnsMessage): Message => {
  const source = snsMessage.source as MessageSource;

  switch (source) {
    case MessageSource.CODE_PIPELINE: {
      return new CodePipelineMessage(snsMessage);
    }
    case MessageSource.DEFAULT:
    default: {
      return new DefaultMessage(snsMessage);
    }
  }
};

export const createMessageCard = async (
  snsMessage: SnsMessage,
): Promise<MessageCard> => {
  const message = createMessage(snsMessage);

  return message.getMessageCard();
};
