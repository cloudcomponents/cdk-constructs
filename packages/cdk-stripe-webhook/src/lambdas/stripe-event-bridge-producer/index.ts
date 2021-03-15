import { SecretKey } from '@cloudcomponents/lambda-utils';
import type { APIGatewayProxyHandler } from 'aws-lambda';
import { EventBridge } from 'aws-sdk';
import Stripe from 'stripe';

const eventBridge = new EventBridge();
const secretKey = new SecretKey({ configuration: { maxRetries: 5 } });

const stripe = new Stripe('123', {
  apiVersion: '2020-08-27',
  telemetry: false,
  typescript: true,
});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const signature = event.headers['Stripe-Signature'];
    if (!signature) {
      throw new Error('Stripe signature is missing');
    }
    const endpointSecret = await secretKey.getValue(process.env.ENDPOINT_SECRET_STRING as string);
    const eventReceived = stripe.webhooks.constructEvent(event.body as string, signature, endpointSecret);

    const { type } = eventReceived;

    const params: EventBridge.PutEventsRequest = {
      Entries: [
        {
          Detail: JSON.stringify(eventReceived),
          DetailType: type,
          EventBusName: process.env.EVENT_BUS_NAME ?? 'default',
          Resources: [],
          Source: process.env.SOURCE,
        },
      ],
    };

    await eventBridge.putEvents(params).promise();

    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    console.error(error);

    if (error.type === 'StripeSignatureVerificationError') {
      return {
        statusCode: 400,
        body: `Webhook Error: ${error.message}`,
      };
    }

    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
