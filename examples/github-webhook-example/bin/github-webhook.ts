#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';

import { GithubWebhookStack } from '../lib/github-webhook-stack';

config();

const app = new App();

new GithubWebhookStack(app, 'GithubWebhookStack', {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    },
});
