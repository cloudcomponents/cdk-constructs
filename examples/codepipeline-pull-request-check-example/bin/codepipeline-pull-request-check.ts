#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { config } from 'dotenv';
import { CodepipelinePullRequestCheckStack } from '../lib/codepipeline-pull-request-check-stack';

config();

const app = new App();

new CodepipelinePullRequestCheckStack(
    app,
    'CodepipelinePullRequestCheckStack',
    {
        env: {
            region: process.env.DEFAULT_REGION,
            account: process.env.CDK_DEFAULT_ACCOUNT,
        },
    },
);
