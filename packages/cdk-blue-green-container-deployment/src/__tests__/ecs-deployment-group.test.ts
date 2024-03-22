import { expect as expectCDK, haveResource, stringLike } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { DummyTaskDefinition, EcsService, EcsDeploymentGroup } from '..';

function createPrereqResources(stack: cdk.Stack): {
  service: EcsService;
  prodTargetGroup: elb.ApplicationTargetGroup;
  testTargetGroup: elb.ApplicationTargetGroup;
  prodListener: elb.ApplicationListener;
  testListener: elb.ApplicationListener;
} {
  const cluster = new ecs.Cluster(stack, 'Cluster');
  const prodTargetGroup = new elb.ApplicationTargetGroup(stack, 'ProdTargetGroup', { vpc: cluster.vpc });
  const testTargetGroup = new elb.ApplicationTargetGroup(stack, 'TestTargetGroup', { vpc: cluster.vpc });
  const taskDefinition = new DummyTaskDefinition(stack, 'DummyTaskDefinition', { image: 'nginx' });
  const service = new EcsService(stack, 'Service', {
    cluster,
    serviceName: 'My Service',
    prodTargetGroup,
    testTargetGroup,
    taskDefinition,
  });
  const loadBalancer = new elb.ApplicationLoadBalancer(stack, 'LoadBalancer', {
    vpc: cluster.vpc,
  });
  const prodListener = loadBalancer.addListener('ProfListener', {
    port: 80,
  });
  prodListener.addTargetGroups('AddProdTg', {
    targetGroups: [prodTargetGroup],
  });
  const testListener = loadBalancer.addListener('TestListener', {
    port: 8080,
  });
  testListener.addTargetGroups('AddTestTg', {
    targetGroups: [testTargetGroup],
  });

  return {
    service,
    prodTargetGroup,
    testTargetGroup,
    prodListener,
    testListener,
  };
}

describe('EcsDeploymentConfig', () => {
  const app = new cdk.App();

  describe('with default props', () => {
    const stack = new cdk.Stack(app, 'StackWithDefaults');
    const { service, prodTargetGroup, testTargetGroup, prodListener, testListener } = createPrereqResources(stack);

    new EcsDeploymentGroup(stack, 'DeploymentGroup', {
      deploymentGroupName: 'My Deployment Group',
      ecsServices: [service],
      targetGroups: [prodTargetGroup, testTargetGroup],
      prodTrafficListener: prodListener,
      testTrafficListener: testListener,
    });

    test('creates a CodeDeploy DeploymentGroup (custom resource)', () => {
      expectCDK(stack).to(
        haveResource('Custom::EcsDeploymentGroup', {
          DeploymentGroupName: 'My Deployment Group',
        }),
      );
    });

    test('creates a CodeDeploy Application', () => {
      expectCDK(stack).to(
        haveResource('AWS::CodeDeploy::Application', {
          ComputePlatform: 'ECS',
        }),
      );

      expectCDK(stack).to(
        haveResource('Custom::EcsDeploymentGroup', {
          ApplicationName: {
            Ref: stringLike('DeploymentGroupEcsApplication*'),
          },
        }),
      );
    });
  });

  describe('with application prop', () => {
    const stack = new cdk.Stack(app, 'StackWithApplication');
    const { service, prodTargetGroup, testTargetGroup, prodListener, testListener } = createPrereqResources(stack);

    const customApplication = new codedeploy.EcsApplication(stack, 'CustomApplication', {
      applicationName: 'My-Custom-Application',
    });

    new EcsDeploymentGroup(stack, 'DeploymentGroup', {
      application: customApplication,
      deploymentGroupName: 'My Deployment Group',
      ecsServices: [service],
      targetGroups: [prodTargetGroup, testTargetGroup],
      prodTrafficListener: prodListener,
      testTrafficListener: testListener,
    });

    test('uses specified application', () => {
      expectCDK(stack).to(
        haveResource('AWS::CodeDeploy::Application', {
          ComputePlatform: 'ECS',
          ApplicationName: 'My-Custom-Application',
        }),
      );

      expectCDK(stack).to(
        haveResource('Custom::EcsDeploymentGroup', {
          ApplicationName: {
            Ref: stringLike('CustomApplication*'),
          },
        }),
      );
    });
  });

  describe('with applicationName prop (deprecated)', () => {
    const stack = new cdk.Stack(app, 'StackWithApplicationName');
    const { service, prodTargetGroup, testTargetGroup, prodListener, testListener } = createPrereqResources(stack);

    new EcsDeploymentGroup(stack, 'DeploymentGroup', {
      applicationName: 'My-Named-Application',
      deploymentGroupName: 'My Deployment Group',
      ecsServices: [service],
      targetGroups: [prodTargetGroup, testTargetGroup],
      prodTrafficListener: prodListener,
      testTrafficListener: testListener,
    });

    test('creates an application with specified name', () => {
      expectCDK(stack).to(
        haveResource('AWS::CodeDeploy::Application', {
          ComputePlatform: 'ECS',
          ApplicationName: 'My-Named-Application',
        }),
      );

      expectCDK(stack).to(
        haveResource('Custom::EcsDeploymentGroup', {
          ApplicationName: {
            Ref: stringLike('DeploymentGroupEcsApplication*'),
          },
        }),
      );
    });
  });
});
