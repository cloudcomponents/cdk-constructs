#!/usr/bin/env node
require('dotenv').config();
const cdk = require('@aws-cdk/cdk');
const { GithubWebhookStack } = require('../lib/github-webhook-stack');

const app = new cdk.App();
new GithubWebhookStack(app, 'GithubWebhookStack');
app.run();
