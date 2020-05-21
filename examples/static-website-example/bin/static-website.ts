#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { StaticWebsiteStack } from '../lib/static-website-stack';

config();

const app = new App();
new StaticWebsiteStack(app, 'StaticWebsiteStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
