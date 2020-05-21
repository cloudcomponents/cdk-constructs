import { config } from 'dotenv';
import { App } from '@aws-cdk/core';
import { BlueGreenContainerDeploymentStack } from './blue-green-container-deployment-stack';

config();

const app = new App();

new BlueGreenContainerDeploymentStack(
  app,
  'BlueGreenContainerDeploymentStack',
  {
    env: {
      region: process.env.DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    },
  },
);
