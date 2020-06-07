#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { PullRequestStack } from './pull-request-stack';

config();

const app = new App();

new PullRequestStack(app, 'PullRequestStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
