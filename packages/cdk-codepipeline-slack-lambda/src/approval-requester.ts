import { SNSEvent } from 'aws-lambda';
import { requestApproval } from './interactions/approval-interactions';

export const handler = async (event: SNSEvent): Promise<void> => {
    const region = process.env.AWS_REGION;
    const message = event.Records[0].Sns.Message as string;
    const { approval } = JSON.parse(message);
    approval.region = region;
    return requestApproval(approval);
};
