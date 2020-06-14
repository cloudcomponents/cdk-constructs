import { SnsMessage } from '../sns-message';
import { MessageCard } from '../message-card';

import { Account } from './Account';

export abstract class Message {
  private account: Account;

  constructor(protected readonly snsMessage: SnsMessage) {
    this.account = new Account(snsMessage, {
      showAccountAlias: true,
    });
  }

  public abstract async getMessageCard(): Promise<MessageCard>;

  public async getAccountLabel(): Promise<string> {
    return this.account.getAccountLabel();
  }

  public getEmoji(): string {
    return '📣';
  }
}
