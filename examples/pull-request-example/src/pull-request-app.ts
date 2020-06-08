#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { PullRequestStack } from './pull-request-stack';

const app = new App();

new PullRequestStack(app, 'PullRequestStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
