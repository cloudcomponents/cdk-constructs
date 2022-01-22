#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { StripeWebhookStack } from './stripe-webhook-stack';

const app = new App();

new StripeWebhookStack(app, 'StripeWebhookStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
