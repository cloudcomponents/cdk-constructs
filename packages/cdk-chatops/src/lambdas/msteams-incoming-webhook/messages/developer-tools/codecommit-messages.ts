import { MessageCard } from '../../message-card';
import { SnsMessage } from '../../sns-message';

import { Message, MessageOptions } from '../message';

export class CodeCommitMessage extends Message {
  constructor(snsMessage: SnsMessage, options: MessageOptions) {
    super('AWS CodeCommit Notification', snsMessage, options);
  }

  protected renderMessageCard(messageCard: MessageCard): MessageCard {
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

  protected getText(): string {
    switch (this.snsMessage.detail.event) {
      case 'commentOnCommitCreated': {
        return `Comment published on commit ${this.snsMessage.detail.afterCommitId.substring(0, 7)}:`;
      }
      default:
        return this.snsMessage.detailType;
    }
  }

  protected getEmoji(): string {
    switch (this.snsMessage.detail.event) {
      case 'commentOnCommitCreated': {
        return '💬';
      }
      default:
        return super.getEmoji();
    }
  }

  private getConsoleUrl(): string {
    return `https://${this.snsMessage.region}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${this.snsMessage.detail.pipeline}/executions/${this.snsMessage.detail['execution-id']}/timeline?region=${this.snsMessage.region}&referer_source=codestar-notifications&referer_medium=chatbot`;
  }
}
