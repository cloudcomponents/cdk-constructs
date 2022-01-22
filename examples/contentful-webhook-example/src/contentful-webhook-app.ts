#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { ContentfulWebhookStack } from './contentful-webhook-stack';

const app = new App();

new ContentfulWebhookStack(app, 'ContentfulWebhookStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
