#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { CodecommitBackupStack } from '../lib/codecommit-backup-stack';

config();

const app = new App();

new CodecommitBackupStack(app, 'CodecommitBackupStack', {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    },
});
