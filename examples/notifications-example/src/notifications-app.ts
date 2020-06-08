#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { NotificationsStack } from './notifications-stack';

const app = new App();

new NotificationsStack(app, 'NotificationsStack', {
  env: {
    region: process.env.REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
