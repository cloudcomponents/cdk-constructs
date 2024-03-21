import { anything, expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { DummyTaskDefinition } from '../dummy-task-definition';
import { EcsService, PropagateTags } from '../ecs-service';

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

    test('Creates a BlueGreenService custom resource', () => {
      expectCDK(stack).to(
        haveResource('Custom::BlueGreenService', {
          ServiceName: 'My Service',
          LaunchType: 'FARGATE',
        }),
      );
    });

    test('Creates a BlueGreenService custom resource without a DesiredCount', () => {
      expectCDK(stack).notTo(
        haveResource('Custom::BlueGreenService', {
          DesiredCount: anything(),
        }),
      );
    });
  });

  describe('with desiredCount', () => {
    const stack = new cdk.Stack(app, 'MyStackWithDesiredCount');
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
      propagateTags: PropagateTags.SERVICE,
      desiredCount: 3,
    });

    test('sets the desired count', () => {
      expectCDK(stack).to(
        haveResource('Custom::BlueGreenService', {
          DesiredCount: 3,
        }),
      );
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
      propagateTags: PropagateTags.SERVICE,
    });

    test('enables tag propagation', () => {
      expectCDK(stack).to(
        haveResource('Custom::BlueGreenService', {
          ServiceName: 'My Service',
          LaunchType: 'FARGATE',
          PropagateTags: 'SERVICE',
        }),
      );
    });
  });

  describe('with tags', () => {
    const stack = new cdk.Stack(app, 'MyStackWithTags');
    const cluster = new ecs.Cluster(stack, 'Cluster');
    const prodTargetGroup = new elb.ApplicationTargetGroup(stack, 'ProdTargetGroup', { vpc: cluster.vpc });
    const testTargetGroup = new elb.ApplicationTargetGroup(stack, 'TestTargetGroup', { vpc: cluster.vpc });
    const taskDefinition = new DummyTaskDefinition(stack, 'DummyTaskDefinition', { image: 'nginx' });

    cdk.Tags.of(stack).add('Foo', 'Bar');

    new EcsService(stack, 'Service', {
      cluster,
      serviceName: 'My Service',
      prodTargetGroup,
      testTargetGroup,
      taskDefinition,
    });

    test('adds Tags to the BlueGreenService', () => {
      expectCDK(stack).to(
        haveResource('Custom::BlueGreenService', {
          Tags: [
            {
              Key: 'Foo',
              Value: 'Bar',
            },
          ],
        }),
      );
    });
  });
});
