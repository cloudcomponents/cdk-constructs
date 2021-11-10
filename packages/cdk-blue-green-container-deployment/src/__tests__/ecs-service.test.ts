import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as elb from '@aws-cdk/aws-elasticloadbalancingv2';

import { expect as expectCDK, haveResource } from '@aws-cdk/assert';

import { EcsService, PropagateTags } from '../ecs-service';
import { DummyTaskDefinition } from '../dummy-task-definition';

describe('EcsService', () => {
  const app = new cdk.App();

  describe('with default props', () => {
    const stack = new cdk.Stack(app, 'MyStackWithDefaults');
    const cluster = new ecs.Cluster(stack, 'Cluster');
    const prodTargetGroup = new elb.ApplicationTargetGroup(stack, 'ProdTargetGroup', { vpc: cluster.vpc });
    const testTargetGroup = new elb.ApplicationTargetGroup(stack, 'TestTargetGroup', { vpc: cluster.vpc });
    const taskDefinition = new DummyTaskDefinition(stack, 'DummyTaskDefinition', { image: 'nginx' });

    new EcsService(stack, 'Service', {
      cluster,
      serviceName: 'My Service',
      prodTargetGroup,
      testTargetGroup,
      taskDefinition,
    });

    it('Creates a BlueGreenService custom resource', () => {
      expectCDK(stack).to(haveResource('Custom::BlueGreenService', {
        ServiceName: 'My Service',
        LaunchType: 'FARGATE'
      }));
    });
  });

  describe('with tag propagation', () => {
    const stack = new cdk.Stack(app, 'MyStackWithTagPropagation');
    const cluster = new ecs.Cluster(stack, 'Cluster');
    const prodTargetGroup = new elb.ApplicationTargetGroup(stack, 'ProdTargetGroup', { vpc: cluster.vpc });
    const testTargetGroup = new elb.ApplicationTargetGroup(stack, 'TestTargetGroup', { vpc: cluster.vpc });
    const taskDefinition = new DummyTaskDefinition(stack, 'DummyTaskDefinition', { image: 'nginx' });

    new EcsService(stack, 'Service', {
      cluster,
      serviceName: 'My Service',
      prodTargetGroup,
      testTargetGroup,
      taskDefinition,
      propagateTags: PropagateTags.SERVICE
    });

    it('enables tag propagation', () => {
      expectCDK(stack).to(haveResource('Custom::BlueGreenService', {
        ServiceName: 'My Service',
        LaunchType: 'FARGATE',
        PropagateTags: 'SERVICE'
      }));
    });
  });
});
