#!/usr/bin/env node
const { App } = require('@aws-cdk/core');
const { StaticWebsiteStack } = require('../lib/static-website-stack');

const app = new App();
new StaticWebsiteStack(app, 'StaticWebsiteStack', {
    env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT,
    }
});
