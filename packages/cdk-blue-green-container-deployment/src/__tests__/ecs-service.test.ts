/* eslint jest/expect-expect: "off" */

import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { DummyTaskDefinition } from '../dummy-task-definition';
import { EcsService, PropagateTags } from '../ecs-service';

describe('EcsService', () => {
  describe('with default props', () => {
    const app = new cdk.App();
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

    const template = Template.fromStack(stack);

    test('Creates a BlueGreenService custom resource', () => {
      template.hasResourceProperties('Custom::BlueGreenService', {
        ServiceName: 'My Service',
        LaunchType: 'FARGATE',
      });
    });
  });

  describe('with tag propagation', () => {
    const app = new cdk.App();
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

    const template = Template.fromStack(stack);

    test('enables tag propagation', () => {
      template.hasResourceProperties('Custom::BlueGreenService', {
        ServiceName: 'My Service',
        LaunchType: 'FARGATE',
        PropagateTags: 'SERVICE',
      });
    });
  });

  describe('with tags', () => {
    const app = new cdk.App();
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

    const template = Template.fromStack(stack);

    test('adds Tags to the BlueGreenService', () => {
      template.hasResourceProperties('Custom::BlueGreenService', {
        Tags: [
          {
            Key: 'Foo',
            Value: 'Bar',
          },
        ],
      });
    });
  });
});
