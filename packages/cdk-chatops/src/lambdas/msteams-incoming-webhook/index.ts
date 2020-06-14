import axios from 'axios';
import { SNSEvent } from 'aws-lambda';

import { createMessageCard } from './messages/message-factory';

export const handler = async (event: SNSEvent): Promise<void> => {
  console.log(event.Records);

  try {
    await Promise.all(
      event.Records.map(async ({ Sns: sns }) => {
        const snsMessage = JSON.parse(sns.Message);
        const messageCard = await createMessageCard(snsMessage);

        return axios.post(process.env.URL as string, messageCard.payload);
      }),
    );
  } catch (e) {
    console.error(e);
  }
};
