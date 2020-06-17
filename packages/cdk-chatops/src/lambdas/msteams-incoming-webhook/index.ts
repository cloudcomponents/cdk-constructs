import axios from 'axios';
import { SNSEvent } from 'aws-lambda';

import { MessageCardFactory, MessageCardFactoryOptions } from './messages';

export const handler = async (event: SNSEvent): Promise<void> => {
  console.log(event.Records);

  const options: MessageCardFactoryOptions = {
    themeColor: process.env.THEME_COLOR,
    accountLabelMode: process.env.ACCOUNT_LABEL_MODE,
  };

  try {
    await Promise.all(
      event.Records.map(async ({ Sns: sns }) => {
        const snsMessage = JSON.parse(sns.Message);

        const messageCard = await MessageCardFactory.createNotificationCard(
          snsMessage,
          options,
        );

        return axios.post(process.env.URL as string, messageCard.payload);
      }),
    );
  } catch (e) {
    console.error(e);
    //MessageCardFactory.createErrorCard(e, options);
  }
};
