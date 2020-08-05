import { MessageCard } from '../message-card';
import { SnsMessage } from '../sns-message';
import { capitalizeFirstLetter, isEmpty } from '../utils';

import { Message, MessageOptions } from './message';

export class RawMessage extends Message {
  constructor(snsMessage: SnsMessage, options: MessageOptions) {
    super(snsMessage.source, snsMessage, options);
  }

  protected renderMessageCard(messageCard: MessageCard): MessageCard {
    if (!isEmpty(this.snsMessage.detail)) {
      messageCard.addSection({
        title: 'Details',
        facts: Object.keys(this.snsMessage.detail).map((key) => ({
          name: capitalizeFirstLetter(key),
          value: JSON.stringify(this.snsMessage.detail[key]),
        })),
      });
    }

    if (!isEmpty(this.snsMessage.additionalAttributes)) {
      messageCard.addSection({
        title: 'Additional Attributes',
        facts: Object.keys(this.snsMessage.additionalAttributes).map((key) => ({
          name: capitalizeFirstLetter(key),
          value: JSON.stringify(this.snsMessage.additionalAttributes[key]),
        })),
      });
    }

    return messageCard;
  }
}
