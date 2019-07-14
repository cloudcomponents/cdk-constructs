#!/usr/bin/env node
const { App } = require('@aws-cdk/core');
const {
  CodepipelineSlackApprovalStack
} = require('../lib/codepipeline-slack-approval-stack');

const app = new App();
new CodepipelineSlackApprovalStack(app, 'CodepipelineSlackApprovalStack', {
  env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    }
});
