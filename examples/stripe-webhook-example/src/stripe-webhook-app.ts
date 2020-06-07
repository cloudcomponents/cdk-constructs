#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { StripeWebhookStack } from './stripe-webhook-stack';

config();

const app = new App();

new StripeWebhookStack(app, 'StripeWebhookStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
