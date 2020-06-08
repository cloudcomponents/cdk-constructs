#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { StaticWebsiteStack } from './static-website-stack';

const app = new App();
new StaticWebsiteStack(app, 'StaticWebsiteStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
