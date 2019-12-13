import { CodePipelineCloudWatchEvent } from 'aws-lambda';

import { CodePipeline } from 'aws-sdk';

import { MessageBuilder, Message, Field } from './message-builder';

// https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
// const StateIcons = {
//     STARTED: ':building_construction:',
//     SUCCEEDED: ':white_check_mark:',
//     RESUMED: '',
//     FAILED: ':x:',
//     CANCELED: ':no_entry:',
//     SUPERSEDED: '',
// };
const PipelineStateIcons = {
    InProgress: ':building_construction:',
    Succeeded: ':white_check_mark:',
    Failed: ':x:',
};

// const STATE_COLORS = {
//     STARTED: '#9E9E9E',
//     SUCCEEDED: 'good',
//     RESUMED: '',
//     FAILED: 'danger',
//     CANCELED: '',
//     SUPERSEDED: '',
// };

// // https://docs.aws.amazon.com/codebuild/latest/APIReference/API_BuildPhase.html
// const BUILD_PHASES = {
//     SUCCEEDED: ':white_check_mark:',
//     FAILED: ':x:',
//     FAULT: '',
//     TIMED_OUT: ':stop_watch:',
//     IN_PROGRESS: ':building_construction:',
//     STOPPED: '',
// };

export class NotifierMessageBuilder extends MessageBuilder {
    protected title: string;

    protected text: string;

    constructor(props: MessageBuilderProps) {
        super({ ...props });
        this.title = props.title;
        this.text = props.text;
    }

    public get message(): Message {
        const callbackId = 'slack_notifier';
        const message: Message = {
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

    private static getRevisionInfo(pipelineExecution): string {
        let revisonInfo = ' - no Info -';
        if (pipelineExecution && pipelineExecution.artifactRevisions) {
            const rev = pipelineExecution.artifactRevisions[0];
            if (rev && rev.revisionId) {
                const revId = rev.revisionId.substr(rev.revisionId.length - 7);
                revisonInfo = `<${rev.revisionUrl}|${revId}>, ${rev.revisionSummary}`;
            }
        }
        return revisonInfo;
    }

    private static getPipelineExecutionStatus(pipelineExecution): string {
        let pipelineExecutionStatus = 'UNKNOWN';
        if (pipelineExecution) {
            const { status } = pipelineExecution;
            pipelineExecutionStatus = status as string;
        }
        return pipelineExecutionStatus;
    }

    private static getPipelineStatusText(pipelineState, executionId): string {
        let pipelineStatusText = '';
        if (pipelineState.stageStates) {
            pipelineState.stageStates.forEach(stageState => {
                if (
                    stageState.latestExecution.pipelineExecutionId ===
                    executionId
                ) {
                    pipelineStatusText = `${pipelineStatusText} ${
                        stageState.stageName
                    }: ${
                        PipelineStateIcons[stageState.latestExecution.status]
                    }`;
                }
            });
        }
        return pipelineStatusText;
    }

    private static getBuildActionStatusText(
        pipelineState,
        executionId,
    ): string {
        let actionStatusText = '';
        if (pipelineState.stageStates) {
            pipelineState.stageStates.forEach(stageState => {
                if (
                    stageState.latestExecution.pipelineExecutionId ===
                    executionId
                ) {
                    stageState.actionStates.forEach(actionState => {
                        actionStatusText = `${actionStatusText} ${
                            actionState.actionName
                        }: ${
                            PipelineStateIcons[
                                actionState.latestExecution.status
                            ]
                        }`;
                    });
                }
            });
        }
        return actionStatusText;
    }

    public static fromPipelineEventAndPipelineState(
        pipelineEvent: CodePipelineCloudWatchEvent,
        pipelineState: CodePipeline.Types.GetPipelineStateOutput,
        pipelineExecution: CodePipeline.Types.PipelineExecution | undefined,
        existingMessage?: Message,
    ): NotifierMessageBuilder {
        const pipelineName = pipelineEvent.detail.pipeline;
        const ts = existingMessage ? existingMessage.ts : undefined;

        const pipelineStatusText = NotifierMessageBuilder.getPipelineStatusText(
            pipelineState,
            pipelineEvent.detail['execution-id'],
        );

        const actionStatusText = NotifierMessageBuilder.getBuildActionStatusText(
            pipelineState,
            pipelineEvent.detail['execution-id'],
        );

        const revisonInfo = NotifierMessageBuilder.getRevisionInfo(
            pipelineExecution,
        );

        const pipelineExecutionStatus = NotifierMessageBuilder.getPipelineExecutionStatus(
            pipelineExecution,
        );

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
}
export interface MessageBuilderProps {
    title: string;
    text: string;
    actions: Record<string, string>[];
    fields: Field[];
    footer: string;
    ts?: string;
}
