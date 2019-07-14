#!/usr/bin/env node
//require('dotenv').config();
const { App } = require('@aws-cdk/core');
const { GithubWebhookStack } = require('../lib/github-webhook-stack');

const app = new App();
new GithubWebhookStack(app, 'GithubWebhookStack', {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    }
});

