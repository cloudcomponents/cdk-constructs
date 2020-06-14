import { MessageCard } from '../message-card';
import { SnsMessage } from '../sns-message';

import { Message } from './message';

export class CodePipelineMessage extends Message {
  constructor(snsMessage: SnsMessage) {
    super(snsMessage);
  }

  public getEmoji(): string {
    switch (this.snsMessage.detail.state) {
      case 'STARTED': {
        return '📣';
      }
      case 'SUCCEEDED': {
        return '✅';
      }
      case 'FAILED': {
        return '❌';
      }
      default:
        return super.getEmoji();
    }
  }

  public getText(): string {
    switch (this.snsMessage.detail.state) {
      case 'STARTED': {
        if (this.snsMessage.detail?.action === 'Approval') {
          return 'CodePipeline Manual Approval action **STARTED**.';
        }

        return 'CodePipeline pipeline execution **STARTED**.';
      }
      case 'SUCCEEDED': {
        if (this.snsMessage.detail?.action === 'Approval') {
          return 'CodePipeline Manual Approval action **SUCCEEDED**.';
        }

        return 'CodePipeline pipeline execution **SUCCEEDED**.';
      }
      case 'FAILED': {
        return `**${this.snsMessage.additionalAttributes.failedActionCount}** action **failed** in stage: **${this.snsMessage.additionalAttributes.failedStage}**.`;
      }
      default:
        return this.snsMessage.detailType;
    }
  }

  public async getMessageCard(): Promise<MessageCard> {
    const accountLabel = await this.getAccountLabel();
    const emoji = this.getEmoji();

    const messageCard = new MessageCard({
      title: `${emoji} AWS CodePipeline Notification | ${this.snsMessage.region} | ${accountLabel})`,
      text: this.getText(),
      themeColor: '#CEDB56',
    });

    if (this.snsMessage.detail.state === 'STARTED') {
      if (this.snsMessage.detail?.action === 'Approval') {
        messageCard.addSection({
          facts: [
            {
              name: 'Pipeline',
              value: this.snsMessage.detail.pipeline,
            },
            {
              name: 'Stage',
              value: this.snsMessage.detail.stage,
            },
            {
              name: 'Action',
              value: this.snsMessage.detail.action,
            },
            {
              name: 'CustomData',
              value: this.snsMessage.additionalAttributes.customData as string,
            },
            {
              name: 'ExternalEntityLink',
              value: this.snsMessage.additionalAttributes
                .externalEntityLink as string,
            },
          ],
        });
      }
    }

    if (this.snsMessage.detail.state === 'FAILED') {
      const { failedActions } = this.snsMessage.additionalAttributes;

      (failedActions as Array<Record<string, string>>).forEach((action) => {
        messageCard.addSection({
          title: `Action ${action.action} failed`,
          startGroup: true,
          text: `${action.additionalInformation}`,
        });
      });
    }

    if (!this.snsMessage.detail.action) {
      messageCard.addSection({
        facts: [
          {
            name: 'Pipeline',
            value: this.snsMessage.detail.pipeline,
          },
        ],
      });
    }

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
