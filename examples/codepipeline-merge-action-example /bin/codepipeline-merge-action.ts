#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';

import { CodePipelineMergeActionStack } from '../src/codepipeline-merge-action-stack';

config();

const app = new App();

new CodePipelineMergeActionStack(app, 'CodePipelineMergeActionStack', {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    },
});
