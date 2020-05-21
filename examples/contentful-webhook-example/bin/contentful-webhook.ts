#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { ContentfulWebhookStack } from '../lib/contentful-webhook-stack';

config();

const app = new App();

new ContentfulWebhookStack(app, 'ContentfulWebhookStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
