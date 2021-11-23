import { Server } from 'http';
import { createMessageAdapter } from '@slack/interactive-messages';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import express, { Express } from 'express';
import { getEnv } from 'get-env-or-die';

import { handleButtonClicked, handleDialog } from '../shared/approval-interactions';

const SLACK_SIGNING_SECRET = getEnv('SLACK_SIGNING_SECRET');

const app: Express = express();

const slackInteractions = createMessageAdapter(SLACK_SIGNING_SECRET);

app.use('/slack/actions', slackInteractions.expressMiddleware());

slackInteractions.action('slack_approval', handleButtonClicked);

slackInteractions.action(/(\w+)_dialog/, handleDialog);

const server = createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context): Server => {
  return proxy(server, event, context);
};
