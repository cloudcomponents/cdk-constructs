import { AttachmentAction, Dialog } from '@slack/web-api';
import { CodePipeline } from 'aws-sdk';

import { ApprovalMessageBuilder, Approval } from './approval-message-builder';
import { Message } from './message';
import { SlackBot } from './slack-bot';

interface DialogPayload {
  message_ts: string;
  actions: AttachmentAction[];
  type: string;
  state: string;
  trigger_id: string;
  original_message: Message;
  callback_id: string;
  user: { id: string; name: string };
  submission: { comment: string };
}

interface ApprovalDialogState {
  ts: string;
  approval: Approval;
}

const { SLACK_BOT_TOKEN, SLACK_CHANNEL, SLACK_CHANNEL_ID, SLACK_CHANNEL_TYPES, SLACK_BOT_NAME, SLACK_BOT_ICON } = process.env;

const pipeline = new CodePipeline();

const bot = new SlackBot({
  token: SLACK_BOT_TOKEN as string,
  channelName: SLACK_CHANNEL as string,
  channelId: SLACK_CHANNEL_ID,
  channelTypes: SLACK_CHANNEL_TYPES as string,
  name: SLACK_BOT_NAME,
  icon: SLACK_BOT_ICON,
});

const buildDialog = (payload: DialogPayload): Dialog => {
  const ts = payload.message_ts;
  const { name, value } = payload.actions[0];

  return {
    callback_id: name === 'approve' ? 'approve_dialog' : 'reject_dialog',
    title: 'Review',
    elements: [{ type: 'textarea', name: 'comment', label: 'Comment' }],
    state: JSON.stringify({
      ts,
      ...JSON.parse(value ?? ''),
    }),
    submit_label: name === 'approve' ? 'Approve' : 'Reject',
    notify_on_cancel: true,
  };
};

export const requestApproval = async (approval: Approval): Promise<void> => {
  try {
    const messageBuilder = ApprovalMessageBuilder.fromApprovalRequest(approval);

    await bot.postMessage(messageBuilder.message);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleButtonClicked = async (payload: DialogPayload): Promise<Message> => {
  try {
    const triggerId = payload.trigger_id;
    const dialog = buildDialog(payload);

    await bot.openDialog(triggerId, dialog);

    const messageBuilder = ApprovalMessageBuilder.fromMessage(payload.original_message);

    // Disabled for now cause there is no Event on Slack Dialog Cancelation.
    // If the Actions are removed it is not possible to Approve/Reject a approval
    // if the Slack dialog is canceled
    //
    // downside: maybe to users will be able to open the dialog to
    //           perform the approval at the same time
    //
    // see: https://github.com/slackapi/node-slack-sdk/issues/524

    // messageBuilder.removeActions();
    // messageBuilder.updateStatus(':building_construction: Work in progress');

    return messageBuilder.message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const handleDialogSubmission = async (payload: DialogPayload): Promise<void> => {
  const { user, state, callback_id, submission } = payload;
  const { comment } = submission;
  const { ts, approval } = JSON.parse(state) as ApprovalDialogState;
  const { token, pipelineName, stageName, actionName } = approval;

  await pipeline
    .putApprovalResult({
      token,
      pipelineName,
      stageName,
      actionName,
      result: {
        status: callback_id === 'approve_dialog' ? 'Approved' : 'Rejected',
        summary: `[name=${user.name} id=${user.id}]: ${comment})`,
      },
    })
    .promise();

  const messageBuilder = ApprovalMessageBuilder.fromApprovalRequest(approval);

  messageBuilder.removeActions();

  messageBuilder.updateStatus(callback_id === 'approve_dialog' ? `:white_check_mark: Approved by ${user.name}` : `:x: Rejected by ${user.name}`);

  messageBuilder.attachComment(comment);

  await bot.updateMessage(ts, messageBuilder.message);
};

const handleDialogCancellation = async (payload: DialogPayload): Promise<void> => {
  const { state } = payload;
  const { ts, approval } = JSON.parse(state) as ApprovalDialogState;

  const messageBuilder = ApprovalMessageBuilder.fromApprovalRequest(approval);

  await bot.updateMessage(ts, messageBuilder.message);
};

export const handleDialog = async (payload: DialogPayload): Promise<void> => {
  try {
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
