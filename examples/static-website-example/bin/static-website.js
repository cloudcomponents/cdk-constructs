#!/usr/bin/env node
const cdk = require('@aws-cdk/cdk');
const { StaticWebsiteStack } = require('../lib/static-website-stack');

const app = new cdk.App();
new StaticWebsiteStack(app, 'StaticWebsiteStack');
app.run();
