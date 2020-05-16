#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';

import { CodepipelineSlackApprovalStack } from '../src/codepipeline-slack-approval-stack';

config();

const app = new App();

new CodepipelineSlackApprovalStack(app, 'CodepipelineSlackApprovalStack', {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    },
});
