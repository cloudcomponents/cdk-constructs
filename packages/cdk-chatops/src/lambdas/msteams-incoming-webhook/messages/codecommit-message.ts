import { MessageCard } from '../message-card';
import { SnsMessage } from '../sns-message';

import { Message } from './message';

export class CodeCommitMessage extends Message {
  constructor(snsMessage: SnsMessage) {
    super(snsMessage);
  }

  public getEmoji(): string {
    switch (this.snsMessage.detail.event) {
      case 'commentOnCommitCreated': {
        return '💬';
      }
      default:
        return super.getEmoji();
    }
  }

  public getText(): string {
    switch (this.snsMessage.detail.event) {
      case 'commentOnCommitCreated': {
        return `Comment published on commit ${this.snsMessage.detail.afterCommitId.substring(
          0,
          7,
        )}:`;
      }
      default:
        return this.snsMessage.detailType;
    }
  }

  public async getMessageCard(): Promise<MessageCard> {
    const accountLabel = await this.getAccountLabel();
    const emoji = this.getEmoji();

    const messageCard = new MessageCard({
      title: `${emoji} AWS CodeCommit Notification | ${this.snsMessage.region} | ${accountLabel})`,
      text: this.getText(),
      themeColor: '#CEDB56',
    });

    messageCard.addSection({
      facts: [
        {
          name: 'Repository',
          value: this.snsMessage.detail.repositoryName,
        },
      ],
    });

    messageCard.addPotentialAction({
      '@type': 'OpenUri',
      name: 'AWS Console',
      targets: [{ os: 'default', uri: this.getConsoleUrl() }],
    });

    return messageCard;
  }

  public getConsoleUrl(): string {
    return `https://${this.snsMessage.region}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${this.snsMessage.detail.pipeline}/executions/${this.snsMessage.detail['execution-id']}/timeline?region=${this.snsMessage.region}&referer_source=codestar-notifications&referer_medium=chatbot`;
  }
}
