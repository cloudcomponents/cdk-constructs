import { CodePipelineCloudWatchEvent } from 'aws-lambda';

import { MessageBuilder, Message } from './message-builder';

// // https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
// const STATE_ICONS = {
//     STARTED: ':building_construction:',
//     SUCCEEDED: ':white_check_mark:',
//     RESUMED: '',
//     FAILED: ':x:',
//     CANCELED: ':no_entry:',
//     SUPERSEDED: '',
// };

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
    public get message(): Message {
        const title = 'APPROVAL NEEDED';
        const text =
            'The following Approval action is waiting for your response:';
        const callbackId = 'slack_notifier';
        const message: Message = {
            attachments: [
                {
                    title,
                    text,
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

    public static fromPipelineEvent(
        pipelineEvent: CodePipelineCloudWatchEvent,
        existingMessage?: Message,
    ): NotifierMessageBuilder {
        if (existingMessage) {
        }
        return new NotifierMessageBuilder({});
    }
}
