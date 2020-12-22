import { Server } from 'http';
import { createMessageAdapter } from '@slack/interactive-messages';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import express from 'express';

import { handleButtonClicked, handleDialog } from '../shared/approval-interactions';

const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET as string;

const app = express();

const slackInteractions = createMessageAdapter(SLACK_SIGNING_SECRET);

app.use('/slack/actions', slackInteractions.expressMiddleware());

slackInteractions.action('slack_approval', handleButtonClicked);

slackInteractions.action(/(\w+)_dialog/, handleDialog);

const server = createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context): Server => {
  return proxy(server, event, context);
};
