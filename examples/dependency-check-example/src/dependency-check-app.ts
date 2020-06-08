#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { DependencyCheckStack } from './dependency-check-stack';

const app = new App();

new DependencyCheckStack(app, 'DependencyCheckStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
