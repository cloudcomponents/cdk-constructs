import { IAM } from 'aws-sdk';

let accountAlias = '';

export class Account {
  constructor(private readonly accountId: string) {}

  public async renderLabel(accountLabelMode?: AccountLabelMode): Promise<string> {
    switch (accountLabelMode) {
      case AccountLabelMode.ID: {
        return `Account: ${this.accountId}`;
      }
      case AccountLabelMode.ALIAS: {
        const alias = await this.getAccountAlias();
        return `Account: ${alias}`;
      }
      case AccountLabelMode.ID_AND_ALIAS:
      default: {
        const alias = await this.getAccountAlias();
        // return 'Account: cloudcomponents (1234567890)';
        return `Account: ${alias} (${this.accountId})`;
      }
    }
  }

  public getAccountId(): string {
    return this.accountId;
  }

  public async getAccountAlias(): Promise<string> {
    if (!accountAlias) {
      const iam = new IAM();

      const { AccountAliases: aliases } = await iam.listAccountAliases().promise();

      accountAlias = aliases[0];
    }

    return accountAlias;
  }
}

export enum AccountLabelMode {
  ID = 'ID',
  ALIAS = 'ALIAS',
  ID_AND_ALIAS = 'ID_AND_ALIAS',
}
