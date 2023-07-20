import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
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

    describe('with execute command', () => {
        const stack = new cdk.Stack(app, 'MyStackWithExecute');
        const cluster = new ecs.Cluster(stack, 'Cluster');
        const prodTargetGroup = new elb.ApplicationTargetGroup(stack, 'ProdTargetGroup', { vpc: cluster.vpc });
        const testTargetGroup = new elb.ApplicationTargetGroup(stack, 'TestTargetGroup', { vpc: cluster.vpc });
        const taskDefinition = new DummyTaskDefinition(stack, 'DummyTaskDefinition', { image: 'nginx' });
        const enableExecuteCommand = true

        new EcsService(stack, 'Service', {
            cluster,
            serviceName: 'My Service',
            prodTargetGroup,
            testTargetGroup,
            taskDefinition,
            enableExecuteCommand
        });

        test('Creates a BlueGreenService custom resource', () => {
            expectCDK(stack).to(
                haveResource('Custom::BlueGreenService', {
                    EnableExecuteCommand: true,
                }),
            );
        });
    });
});
