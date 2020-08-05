import { MessageCard } from '../../message-card';
import { SnsMessage } from '../../sns-message';

import { Message, MessageOptions } from '../message';

export class PipelineExecutionMessage extends Message {
  constructor(snsMessage: SnsMessage, options: MessageOptions) {
    super('AWS CodePipeline Notification', snsMessage, options);
  }

  protected renderMessageCard(messageCard: MessageCard): MessageCard {
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

    messageCard.addSection({
      facts: [
        {
          name: 'Pipeline',
          value: this.snsMessage.detail.pipeline,
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
    switch (this.snsMessage.detail.state) {
      case 'STARTED': {
        return 'CodePipeline pipeline execution **STARTED**.';
      }
      case 'SUCCEEDED': {
        return 'CodePipeline pipeline execution **SUCCEEDED**.';
      }
      case 'FAILED': {
        return `**${this.snsMessage.additionalAttributes.failedActionCount}** action **failed** in stage: **${this.snsMessage.additionalAttributes.failedStage}**.`;
      }
      default:
        return this.snsMessage.detailType;
    }
  }

  protected getEmoji(): string {
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

  private getConsoleUrl(): string {
    return `https://${this.snsMessage.region}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${this.snsMessage.detail.pipeline}/executions/${this.snsMessage.detail['execution-id']}/timeline?region=${this.snsMessage.region}&referer_source=codestar-notifications&referer_medium=chatbot`;
  }
}

export class ActionExecutionMessage extends Message {
  constructor(snsMessage: SnsMessage, options: MessageOptions) {
    super('AWS CodePipeline Notification', snsMessage, options);
  }

  protected renderMessageCard(messageCard: MessageCard): MessageCard {
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
              value: this.snsMessage.additionalAttributes.externalEntityLink as string,
            },
          ],
        });
      }
    }

    if (this.snsMessage.detail.state === 'FAILED') {
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

  protected getText(): string {
    switch (this.snsMessage.detail.state) {
      case 'STARTED': {
        if (this.snsMessage.detail?.action === 'Approval') {
          return 'CodePipeline Manual Approval action **STARTED**.';
        }

        return 'CodePipeline action execution **STARTED**.';
      }
      case 'SUCCEEDED': {
        if (this.snsMessage.detail?.action === 'Approval') {
          return 'CodePipeline Manual Approval action **SUCCEEDED**.';
        }

        return 'CodePipeline action execution **SUCCEEDED**.';
      }
      case 'FAILED': {
        if (this.snsMessage.detail?.action === 'Approval') {
          return 'CodePipeline Manual Approval action **FAILED**.';
        }

        return 'CodePipeline action execution **FAILED**.';
      }
      default:
        return this.snsMessage.detailType;
    }
  }

  protected getEmoji(): string {
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

  private getConsoleUrl(): string {
    return `https://${this.snsMessage.region}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${this.snsMessage.detail.pipeline}/executions/${this.snsMessage.detail['execution-id']}/timeline?region=${this.snsMessage.region}&referer_source=codestar-notifications&referer_medium=chatbot`;
  }
}

export class StageExecutionMessage extends Message {
  constructor(snsMessage: SnsMessage, options: MessageOptions) {
    super('AWS CodePipeline Notification', snsMessage, options);
  }

  protected renderMessageCard(messageCard: MessageCard): MessageCard {
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
    switch (this.snsMessage.detail.state) {
      case 'STARTED': {
        return 'CodePipeline stage execution **STARTED**.';
      }
      case 'SUCCEEDED': {
        return 'CodePipeline stage execution **SUCCEEDED**.';
      }
      case 'FAILED': {
        return 'CodePipeline stage execution **FAILED**.';
      }
      default:
        return this.snsMessage.detailType;
    }
  }

  protected getEmoji(): string {
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

  private getConsoleUrl(): string {
    return `https://${this.snsMessage.region}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${this.snsMessage.detail.pipeline}/executions/${this.snsMessage.detail['execution-id']}/timeline?region=${this.snsMessage.region}&referer_source=codestar-notifications&referer_medium=chatbot`;
  }
}
