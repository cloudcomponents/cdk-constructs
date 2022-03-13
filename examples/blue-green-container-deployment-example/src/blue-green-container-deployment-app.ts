#!/usr/bin/env node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { BlueGreenContainerDeploymentStack } from './blue-green-container-deployment-stack';

const app = new App();

new BlueGreenContainerDeploymentStack(app, 'BlueGreenContainerDeploymentStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
