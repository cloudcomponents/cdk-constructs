#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { CodePipelineCheckParameterActionStack } from './codepipeline-check-parameter-action-stack';

const app = new App();

new CodePipelineCheckParameterActionStack(app, 'CodePipelineCheckParameterActionStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
