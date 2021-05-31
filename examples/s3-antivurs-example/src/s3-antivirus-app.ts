#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { S3AntivirusStack } from './s3-antivirus-stack';

const app = new App();

new S3AntivirusStack(app, 'S3AntivirusStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
