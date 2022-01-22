#!/usr/bin/env node

import 'source-map-support/register';
import { App, Duration } from 'aws-cdk-lib';

import { TempInfraStack } from './temp-infra-stack';

const app = new App();

new TempInfraStack(app, 'TempInfraStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  ttl: Duration.minutes(10),
});
