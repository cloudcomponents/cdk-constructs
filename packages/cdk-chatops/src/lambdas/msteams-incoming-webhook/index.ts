import * as https from 'https';
import * as url from 'url';
import { SNSEvent } from 'aws-lambda';

import { MessageCard } from './message-card';

export const handler = async (event: SNSEvent): Promise<void> => {
  console.log(event.Records);

  try {
    await Promise.all(
      event.Records.map(async ({ Sns: sns }) => {
        const message = JSON.parse(sns.Message);

        const {
          source,
          detailType,
          region,
          account,
          detail,
          additionalAttributes,
        } = message;

        const messageCard = new MessageCard({
          title: `${source} | ${region} | Account: ${account}`,
          text: detailType,
          themeColor: '#CEDB56',
        });

        if (!isEmpty(detail)) {
          messageCard.addSection({
            title: 'Details',
            facts: Object.keys(detail).map((key) => ({
              name: capitalizeFirstLetter(key),
              value: JSON.stringify(detail[key]),
            })),
          });
        }

        if (!isEmpty(additionalAttributes)) {
          messageCard.addSection({
            title: 'Additional Attributes',
            facts: Object.keys(additionalAttributes).map((key) => ({
              name: capitalizeFirstLetter(key),
              value: JSON.stringify(additionalAttributes[key]),
            })),
          });
        }

        return sendHttpRequest(JSON.stringify(messageCard.payload));
      }),
    );
  } catch (e) {
    console.error(e);
  }
};

// TODO
const sendHttpRequest = async (body: string): Promise<void> => {
  const parsedUrl = url.parse(process.env.URL as string);

  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'content-length': body.length,
    },
  };

  return new Promise((resolve, reject) => {
    try {
      const request = https.request(options, () => resolve());
      request.on('error', reject);
      request.write(body);
      request.end();
    } catch (e) {
      reject(e);
    }
  });
};

const capitalizeFirstLetter = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;
