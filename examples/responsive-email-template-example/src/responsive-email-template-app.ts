#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { ResponsiveEmailTemplateStack } from './responsive-email-template-stack';

const app = new App();

new ResponsiveEmailTemplateStack(app, 'TempInfraStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
