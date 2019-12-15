import { SNSEvent } from 'aws-lambda';
import { requestApproval } from './interactions/approval-interactions';

export const handler = async (event: SNSEvent): Promise<void> => {
    const region = event.Records[0].EventSubscriptionArn.split(':')[3];
    const message = JSON.parse(event.Records[0].Sns.Message as string);
    const approval = { region, ...message };
    return requestApproval(approval);
};
