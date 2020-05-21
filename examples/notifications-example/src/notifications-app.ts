import { App } from '@aws-cdk/core';
import { config } from 'dotenv';

import { NotificationsStack } from './notifications-stack';

config();

const app = new App();

new NotificationsStack(app, 'NotificationsStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
