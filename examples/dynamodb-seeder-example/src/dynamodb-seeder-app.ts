#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { DynamoDBSeederStack } from './dynamodb-seeder-stack';

const app = new App();

new DynamoDBSeederStack(app, 'DynamoDBSeederStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
