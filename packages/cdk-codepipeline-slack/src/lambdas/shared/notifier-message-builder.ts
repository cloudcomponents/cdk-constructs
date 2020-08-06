import { MessageAttachment } from '@slack/web-api';
import type { CodePipelineCloudWatchEvent } from 'aws-lambda';
import { CodePipeline } from 'aws-sdk';

import { Message } from './message';
import { MessageBuilder } from './message-builder';

const getPipelineStateIcon = (state: string | undefined): string => {
  switch (state) {
    case 'InProgress':
      return ':building_construction:';
    case 'Succeeded':
      return ':white_check_mark:';
    case 'Failed':
      return ':x:';
    default:
      throw new Error(`Unknown state ${state ?? 'undefined'}`);
  }
};

export class NotifierMessageBuilder extends MessageBuilder {
  public static fromPipelineEventAndPipelineState(
    pipelineEvent: CodePipelineCloudWatchEvent,
    pipelineState: CodePipeline.Types.GetPipelineStateOutput,
    pipelineExecution: CodePipeline.Types.PipelineExecution | undefined,
    existingMessage?: Message,
  ): NotifierMessageBuilder {
    const pipelineName = pipelineEvent.detail.pipeline;
    const ts = existingMessage ? existingMessage.ts : undefined;

    const pipelineStatusText = NotifierMessageBuilder.getPipelineStatusText(pipelineState, pipelineEvent.detail['execution-id']);

    const actionStatusText = NotifierMessageBuilder.getBuildActionStatusText(pipelineState, pipelineEvent.detail['execution-id']);

    const revisonInfo = NotifierMessageBuilder.getRevisionInfo(pipelineExecution);

    const pipelineExecutionStatus = NotifierMessageBuilder.getPipelineExecutionStatus(pipelineExecution);

    return new NotifierMessageBuilder({
      title: '',
      text: '',
      fields: [
        {
          title: pipelineName,
          value: pipelineExecutionStatus,
          short: true,
        },
        { title: 'Revision', value: revisonInfo, short: true },
        { title: 'Stages', value: pipelineStatusText, short: false },
        {
          title: 'Build Actions',
          value: actionStatusText,
          short: false,
        },
      ],
      ts,
      actions: [],
      footer: pipelineEvent.detail['execution-id'],
    });
  }

  private static getRevisionInfo(pipelineExecution: CodePipeline.Types.PipelineExecution | undefined): string {
    let revisonInfo = ' - no Info -';
    if (pipelineExecution?.artifactRevisions) {
      const rev = pipelineExecution.artifactRevisions[0];
      if (rev.revisionId && rev.revisionUrl && rev.revisionSummary) {
        const revId = rev.revisionId.substr(rev.revisionId.length - 7);
        revisonInfo = `<${rev.revisionUrl}|${revId}>, ${rev.revisionSummary}`;
      }
    }
    return revisonInfo;
  }

  private static getPipelineExecutionStatus(pipelineExecution: CodePipeline.Types.PipelineExecution | undefined): string {
    let pipelineExecutionStatus = 'UNKNOWN';
    if (pipelineExecution) {
      const { status } = pipelineExecution;
      pipelineExecutionStatus = status as string;
    }
    return pipelineExecutionStatus;
  }

  private static getPipelineStatusText(pipelineState: CodePipeline.Types.GetPipelineStateOutput, executionId: string): string {
    let pipelineStatusText = '';
    if (pipelineState.stageStates) {
      pipelineState.stageStates.forEach((stageState) => {
        if (stageState?.latestExecution?.pipelineExecutionId === executionId && stageState.stageName && stageState.latestExecution) {
          pipelineStatusText = `${pipelineStatusText} ${stageState.stageName}: ${getPipelineStateIcon(stageState.latestExecution.status)}`;
        }
      });
    }
    return pipelineStatusText;
  }

  private static getBuildActionStatusText(pipelineState: CodePipeline.Types.GetPipelineStateOutput, executionId: string): string {
    let actionStatusText = '';
    if (pipelineState.stageStates) {
      pipelineState.stageStates.forEach((stageState) => {
        if (stageState?.latestExecution?.pipelineExecutionId === executionId) {
          stageState.actionStates?.forEach((actionState) => {
            actionStatusText = `${actionStatusText} ${actionState.actionName as string}: ${getPipelineStateIcon(
              actionState?.latestExecution?.status,
            )}`;
          });
        }
      });
    }
    return actionStatusText;
  }

  protected title?: string;

  protected text?: string;

  constructor(props: MessageAttachment) {
    super(props);
    this.title = props.title;
    this.text = props.text;
  }

  public get message(): Message {
    const callbackId = 'slack_notifier';
    const message: Message = {
      text: '',
      attachments: [
        {
          title: this.title,
          text: this.text,
          callback_id: callbackId,
          fields: this.fields,
          footer: this.footer,
          actions: this.actions,
        },
      ],
    };

    if (this.ts) {
      message.ts = this.ts;
    }

    return message;
  }
}
