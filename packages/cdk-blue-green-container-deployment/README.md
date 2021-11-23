[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-blue-green-container-deployment 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-blue-green-container-deployment)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-blue-green-container-deployment/)
[![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk)

> Blue green container deployment with CodeDeploy

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-blue-green-container-deployment
```

Python:

```bash
pip install cloudcomponents.cdk-blue-green-container-deployment
```

## How to use

```typescript
import { Construct, Duration, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import { Vpc, Port } from '@aws-cdk/aws-ec2';
import { Cluster } from '@aws-cdk/aws-ecs';
import {
  ApplicationLoadBalancer,
  ApplicationTargetGroup,
  TargetType,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import {
  CodeBuildAction,
  CodeCommitSourceAction,
  CodeDeployEcsDeployAction,
} from '@aws-cdk/aws-codepipeline-actions';

import { ImageRepository } from '@cloudcomponents/cdk-container-registry';
import {
  EcsService,
  DummyTaskDefinition,
  EcsDeploymentConfig,
  EcsDeploymentGroup,
  PushImageProject,
} from '@cloudcomponents/cdk-blue-green-container-deployment';

export class BlueGreenContainerDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc', {
      maxAzs: 2,
    });

    const cluster = new Cluster(this, 'Cluster', {
      vpc,
      clusterName: 'blue-green-cluster',
    });

    const loadBalancer = new ApplicationLoadBalancer(this, 'LoadBalancer', {
      vpc,
      internetFacing: true,
    });

    const prodListener = loadBalancer.addListener('ProdListener', {
      port: 80,
    });

    const testListener = loadBalancer.addListener('TestListener', {
      port: 8080,
    });

    const prodTargetGroup = new ApplicationTargetGroup(
      this,
      'ProdTargetGroup',
      {
        port: 80,
        targetType: TargetType.IP,
        vpc,
      },
    );

    prodListener.addTargetGroups('AddProdTg', {
      targetGroups: [prodTargetGroup],
    });

    const testTargetGroup = new ApplicationTargetGroup(
      this,
      'TestTargetGroup',
      {
        port: 8080,
        targetType: TargetType.IP,
        vpc,
      },
    );

    testListener.addTargetGroups('AddTestTg', {
      targetGroups: [testTargetGroup],
    });

    // Will be replaced by CodeDeploy in CodePipeline
    const taskDefinition = new DummyTaskDefinition(
      this,
      'DummyTaskDefinition',
      {
        image: 'nginx',
        family: 'blue-green',
      },
    );

    const ecsService = new EcsService(this, 'EcsService', {
      cluster,
      serviceName: 'blue-green-service',
      desiredCount: 2,
      taskDefinition,
      prodTargetGroup,
      testTargetGroup,
    });

    ecsService.connections.allowFrom(loadBalancer, Port.tcp(80));
    ecsService.connections.allowFrom(loadBalancer, Port.tcp(8080));

    const deploymentConfig = new EcsDeploymentConfig(
      this,
      'DeploymentConfig',
      {
        deploymentConfigName: 'Canary20Percent5Minute',
        trafficRoutingConfig: {
          type: 'TimeBasedCanary',
          timeBasedCanary: {
            canaryInterval: 5,
            canaryPercentage: 20,
          },
        },
      }
    );

    const deploymentGroup = new EcsDeploymentGroup(this, 'DeploymentGroup', {
      applicationName: 'blue-green-application',
      deploymentGroupName: 'blue-green-deployment-group',
      ecsServices: [ecsService],
      targetGroups: [prodTargetGroup, testTargetGroup],
      prodTrafficListener: prodListener,
      testTrafficListener: testListener,
      terminationWaitTime: Duration.minutes(100),
      deploymentConfig, // If you want to use default DeploymentConfig name, use static method as "EcsDeploymentConfig.CANARY_10PERCENT_15MINUTES".
    });

    // @see https://github.com/cloudcomponents/cdk-constructs/tree/master/examples/blue-green-container-deployment-example/blue-green-repository
    const repository = new Repository(this, 'CodeRepository', {
      repositoryName: 'blue-green-repository',
    });

    const imageRepository = new ImageRepository(this, 'ImageRepository', {
      forceDelete: true, //Only for tests
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
    });

    const imageArtifact = new Artifact('ImageArtifact');
    const manifestArtifact = new Artifact('ManifestArtifact');

    const pushImageProject = new PushImageProject(this, 'PushImageProject', {
      imageRepository,
      taskDefinition,
    });

    const buildAction = new CodeBuildAction({
      actionName: 'PushImage',
      project: pushImageProject,
      input: sourceArtifact,
      outputs: [imageArtifact, manifestArtifact],
    });

    const deployAction = new CodeDeployEcsDeployAction({
      actionName: 'CodeDeploy',
      taskDefinitionTemplateInput: manifestArtifact,
      appSpecTemplateInput: manifestArtifact,
      containerImageInputs: [
        {
          input: imageArtifact,
          taskDefinitionPlaceholder: 'IMAGE1_NAME',
        },
      ],
      deploymentGroup,
    });

    new Pipeline(this, 'Pipeline', {
      pipelineName: 'blue-green-pipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Build',
          actions: [buildAction],
        },
        {
          stageName: 'Deploy',
          actions: [deployAction],
        },
      ],
    });
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-blue-green-container-deployment/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-blue-green-container-deployment//LICENSE)
