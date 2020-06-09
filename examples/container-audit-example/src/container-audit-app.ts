#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { ContainerAuditStack } from './container-audit-stack';

const app = new App();

new ContainerAuditStack(app, 'ContainerAuditStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
