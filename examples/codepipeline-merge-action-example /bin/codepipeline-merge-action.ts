#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';

import { CodepipelineMergeActionStack } from '../lib/codepipeline-merge-action-stack';

config();

const app = new App();

new CodepipelineMergeActionStack(app, 'CodepipelineMergeActionStack', {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    },
});
