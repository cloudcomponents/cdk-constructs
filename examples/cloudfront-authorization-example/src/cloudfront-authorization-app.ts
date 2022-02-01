#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { CloudFrontAuthorizationStack } from './cloudfront-authorization-stack';

const app = new App();

new CloudFrontAuthorizationStack(app, 'CloudFrontAuthorizationStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
