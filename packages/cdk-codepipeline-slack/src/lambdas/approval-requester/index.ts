import type { SNSEvent } from 'aws-lambda';
import { requestApproval } from '../shared/approval-interactions';
import { Approval } from '../shared/approval-message-builder';

interface ApprovalMessage {
  approval: Approval;
}

export const handler = async (event: SNSEvent): Promise<void> => {
  const region = process.env.AWS_REGION as string;
  const message = event.Records[0].Sns.Message;
  const { approval } = JSON.parse(message) as ApprovalMessage;
  approval.region = region;
  return requestApproval(approval);
};
