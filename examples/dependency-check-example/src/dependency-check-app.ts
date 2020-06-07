#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { DependencyCheckStack } from './dependency-check-stack';

config();

const app = new App();

new DependencyCheckStack(app, 'DependencyCheckStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
