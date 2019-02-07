#!/usr/bin/env node
const cdk = require('@aws-cdk/cdk');
const { EdgeDeployStack } = require('../lib/edge-deploy-stack');

const app = new cdk.App();
new EdgeDeployStack(app, 'EdgeDeployStack');
app.run();
