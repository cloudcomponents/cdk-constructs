#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { CodePipelineSlackApprovalStack } from './codepipeline-slack-approval-stack';

const app = new App();

new CodePipelineSlackApprovalStack(app, 'CodePipelineSlackApprovalStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
