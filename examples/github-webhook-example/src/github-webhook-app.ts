#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { GithubWebhookStack } from './github-webhook-stack';

const app = new App();

new GithubWebhookStack(app, 'GithubWebhookStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
