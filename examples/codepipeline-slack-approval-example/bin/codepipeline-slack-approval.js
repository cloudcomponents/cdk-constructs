#!/usr/bin/env node
require('dotenv').config();
const cdk = require('@aws-cdk/cdk');
const {
  CodepipelineSlackApprovalStack
} = require('../lib/codepipeline-slack-approval-stack');

const app = new cdk.App();
new CodepipelineSlackApprovalStack(app, 'CodepipelineSlackApprovalStack');
app.run();
