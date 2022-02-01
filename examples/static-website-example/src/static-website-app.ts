#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { StaticWebsiteStack } from './static-website-stack';

const app = new App();

new StaticWebsiteStack(app, 'StaticWebsiteStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
