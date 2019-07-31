#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { CodepipelinePullRequestCheckStack } from '../lib/codepipeline-pull-request-check-stack';

const app = new App();
new CodepipelinePullRequestCheckStack(
    app,
    'CodepipelinePullRequestCheckStack',
    {
        env: {
            region: process.env.CDK_DEFAULT_REGION,
            account: process.env.CDK_DEFAULT_ACCOUNT,
        },
    },
);
