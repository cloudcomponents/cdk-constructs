#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { CodeCommitBackupStack } from './codecommit-backup-stack';

config();

const app = new App();

new CodeCommitBackupStack(app, 'CodeCommitBackupStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
