import { SnsMessage } from '../sns-message';
import { MessageCard } from '../message-card';

import { Account, AccountLabelMode } from './account';

export interface MessageOptions {
  accountLabelMode?: AccountLabelMode;
  themeColor?: string;
}

export abstract class Message {
  constructor(
    protected readonly title: string,
    protected readonly snsMessage: SnsMessage,
    private readonly options: MessageOptions,
  ) {}

  public async render(): Promise<MessageCard> {
    const { account: accountId, region } = this.snsMessage;

    const account = new Account(accountId);

    const accountLabel = await account.renderLabel(
      this.options.accountLabelMode,
    );

    const emoji = this.getEmoji();

    const messageCard = new MessageCard({
      title: `${emoji} ${this.title} | ${region} | ${accountLabel})`,
      text: this.getText(),
      themeColor: this.options.themeColor,
    });

    return this.renderMessageCard(messageCard);
  }

  protected abstract async renderMessageCard(
    messageCard: MessageCard,
  ): Promise<MessageCard>;

  protected getText(): string {
    return this.snsMessage.detailType;
  }

  protected getEmoji(): string {
    return '📣';
  }
}
