/* eslint-disable @typescript-eslint/camelcase */

import { CodePipeline } from 'aws-sdk';
import { SlackBot } from './slack-bot';
import { ApprovalMessageBuilder } from './approval_message_builder';

const {
    SLACK_BOT_TOKEN,
    SLACK_CHANNEL,
    SLACK_CHANNEL_ID,
    SLACK_BOT_NAME,
    SLACK_BOT_ICON,
} = process.env;

const pipeline = new CodePipeline();

const bot = new SlackBot({
    token: SLACK_BOT_TOKEN,
    channelName: SLACK_CHANNEL,
    channelId: SLACK_CHANNEL_ID,
    name: SLACK_BOT_NAME,
    icon: SLACK_BOT_ICON,
});

const buildDialog = payload => {
    const ts = payload.message_ts;
    const { name, value } = payload.actions[0];

    const dialog = {
        callback_id: name === 'approve' ? 'approve_dialog' : 'reject_dialog',
        title: 'Review',
        elements: [{ type: 'textarea', name: 'comment', label: 'Comment' }],
        state: JSON.stringify({
            ts,
            ...JSON.parse(value),
        }),
        submit_label: name === 'approve' ? 'Approve' : 'Reject',
        notify_on_cancel: true,
    };

    return dialog;
};

export const requestApproval = async (approval): Promise<void> => {
    try {
        const messageBuilder = ApprovalMessageBuilder.fromApprovalRequest(
            approval,
        );

        await bot.postMessage(messageBuilder.message);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const handleButtonClicked = async payload => {
    try {
        console.log(payload);

        const triggerId = payload.trigger_id;
        const dialog = buildDialog(payload);

        await bot.openDialog(triggerId, dialog);

        const messageBuilder = ApprovalMessageBuilder.fromMessage(
            payload.original_message,
        );

        messageBuilder.removeActions();

        messageBuilder.updateStatus(':building_construction: Work in progress');

        return messageBuilder.message;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const handleDialogSubmission = async (payload): Promise<void> => {
    const { user, state, callback_id, submission } = payload;
    const { comment } = submission;
    const { ts, approval } = JSON.parse(state);
    const { token, pipelineName, stageName, actionName } = approval;

    await pipeline
        .putApprovalResult({
            token,
            pipelineName,
            stageName,
            actionName,
            result: {
                status:
                    callback_id === 'approve_dialog' ? 'Approved' : 'Rejected',
                summary: `[name=${user.name} id=${user.id}]: ${comment})`,
            },
        })
        .promise();

    const messageBuilder = ApprovalMessageBuilder.fromApprovalRequest(approval);

    messageBuilder.removeActions();

    messageBuilder.updateStatus(
        callback_id === 'approve_dialog'
            ? `:white_check_mark: Approved by ${user.name}`
            : `:x: Rejected by ${user.name}`,
    );

    messageBuilder.attachComment(comment);

    await bot.updateMessage(ts, messageBuilder.message);
};

const handleDialogCancellation = async (payload): Promise<void> => {
    const { state } = payload;
    const { ts, approval } = JSON.parse(state);

    const messageBuilder = ApprovalMessageBuilder.fromApprovalRequest(approval);

    await bot.updateMessage(ts, messageBuilder.message);
};

export const handleDialog = async (payload): Promise<void> => {
    try {
        console.log(payload);

        const { type } = payload;

        if (type === 'dialog_submission') {
            await handleDialogSubmission(payload);
            return;
        }

        await handleDialogCancellation(payload);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
