import { SNSEvent } from 'aws-lambda'; // eslint-disable-line import/no-unresolved
import { requestApproval } from './interactions/approval-interactions';

export const handler = async (event: SNSEvent): Promise<void> => {
    const message = event.Records[0].Sns.Message as string;
    console.log(message);
    const { approval } = JSON.parse(message);

    return requestApproval(approval);
};
