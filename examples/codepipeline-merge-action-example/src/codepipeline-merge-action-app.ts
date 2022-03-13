#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { CodePipelineMergeActionStack } from './codepipeline-merge-action-stack';

const app = new App();

new CodePipelineMergeActionStack(app, 'CodePipelineMergeActionStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
