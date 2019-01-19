import { SNSEvent } from 'aws-lambda';
import { requestApproval } from './interactions/approval-interactions';

export const handler = async (event: SNSEvent) => {
  const message = event.Records[0]['Sns']['Message'];
  console.log(message);
  const { approval } = JSON.parse(message);

  return await requestApproval(approval);
};
