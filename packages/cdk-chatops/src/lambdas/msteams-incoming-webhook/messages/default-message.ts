import { MessageCard } from '../message-card';
import { SnsMessage } from '../sns-message';
import { capitalizeFirstLetter, isEmpty } from '../utils';

import { Message } from './message';

export class DefaultMessage extends Message {
  constructor(snsMessage: SnsMessage) {
    super(snsMessage);
  }

  public async getMessageCard(): Promise<MessageCard> {
    const accountLabel = await this.getAccountLabel();
    const emoji = this.getEmoji();

    const messageCard = new MessageCard({
      title: `${emoji} ${this.snsMessage.source} | ${this.snsMessage.region} | ${accountLabel})`,
      text: this.snsMessage.detailType,
      themeColor: '#CEDB56',
    });

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
