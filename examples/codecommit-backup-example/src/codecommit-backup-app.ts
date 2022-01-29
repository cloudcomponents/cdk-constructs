#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { CodeCommitBackupStack } from './codecommit-backup-stack';

const app = new App();

new CodeCommitBackupStack(app, 'CodeCommitBackupStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
