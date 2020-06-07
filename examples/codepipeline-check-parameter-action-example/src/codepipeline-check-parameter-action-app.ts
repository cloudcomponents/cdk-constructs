#!/usr/bin/env node

import { App } from '@aws-cdk/core';
import { config } from 'dotenv';

import { CodePipelineCheckParameterActionStack } from './codepipeline-check-parameter-action-stack';

config();

const app = new App();

new CodePipelineCheckParameterActionStack(
  app,
  'CodePipelineCheckParameterActionStack',
  {
    env: {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    },
  },
);
