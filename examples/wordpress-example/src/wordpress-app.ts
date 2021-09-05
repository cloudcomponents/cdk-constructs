#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { WordpressStack } from './wordpress-stack';

const app = new App();

new WordpressStack(app, 'WordpressStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
