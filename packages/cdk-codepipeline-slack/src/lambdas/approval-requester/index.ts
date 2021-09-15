import type { SNSEvent } from 'aws-lambda';
import { getEnv } from 'get-env-or-die';

import { requestApproval } from '../shared/approval-interactions';
import { Approval } from '../shared/approval-message-builder';

interface ApprovalMessage {
  approval: Approval;
}

export const handler = async (event: SNSEvent): Promise<void> => {
  const message = event.Records[0].Sns.Message;
  const { approval } = JSON.parse(message) as ApprovalMessage;
  approval.region = getEnv('AWS_REGION');
  return requestApproval(approval);
};
