import { App, Stack, StackProps } from '@aws-cdk/core';
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
  EcsDeploymentGroup,
  PushImageProject,
} from '@cloudcomponents/cdk-blue-green-container-deployment';

export class BlueGreenContainerDeploymentStack extends Stack {
  public constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

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

    const prodListener = loadBalancer.addListener('ProfListener', {
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
    });

    ecsService.connections.allowFrom(loadBalancer, Port.tcp(80));
    ecsService.connections.allowFrom(loadBalancer, Port.tcp(8080));

    const deploymentGroup = new EcsDeploymentGroup(this, 'DeploymentGroup', {
      applicationName: 'blue-green-application',
      deploymentGroupName: 'blue-green-deployment-group',
      ecsServices: [ecsService],
      targetGroupNames: [
        prodTargetGroup.targetGroupName,
        testTargetGroup.targetGroupName,
      ],
      prodTrafficListener: prodListener,
      testTrafficListener: testListener,
      terminationWaitTimeInMinutes: 100,
    });

    // @see files: ./blue-green-repository for example content
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
