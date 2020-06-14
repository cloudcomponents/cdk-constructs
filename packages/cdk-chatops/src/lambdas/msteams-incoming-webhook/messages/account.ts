import { IAM } from 'aws-sdk';
import { SnsMessage } from '../sns-message';

let accountAlias = '';

export interface AccountOptions {
  showAccountAlias: boolean;
}

export class Account {
  constructor(
    private readonly message: SnsMessage,
    private readonly options: AccountOptions,
  ) {}

  public async getAccountLabel(): Promise<string> {
    if (this.options.showAccountAlias) {
      const alias = await this.getAccountAlias();
      return `Account: ${alias} (${this.message.account})`;
    }

    return `Account: ${this.message.account}`;
  }

  private async getAccountAlias(): Promise<string> {
    if (!accountAlias) {
      const iam = new IAM();

      const {
        AccountAliases: aliases,
      } = await iam.listAccountAliases().promise();

      accountAlias = aliases[0];
    }

    return accountAlias;
  }
}
