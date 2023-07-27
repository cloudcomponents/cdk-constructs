import * as path from 'path';
import { Duration, CustomResource, ITaggable, TagManager, TagType, Lazy } from 'aws-cdk-lib';
import { IConnectable, Connections, SecurityGroup, Port } from 'aws-cdk-lib/aws-ec2';
import { ICluster, LaunchType, DeploymentCircuitBreaker } from 'aws-cdk-lib/aws-ecs';
import { ITargetGroup } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { DummyTaskDefinition } from './dummy-task-definition';

export interface IEcsService {
  readonly clusterName: string;
  readonly serviceName: string;
}

export interface EcsServiceProps {
  readonly securityGroups?: SecurityGroup[];
  readonly cluster: ICluster;
  readonly serviceName: string;
  readonly launchType?: LaunchType;
  readonly platformVersion?: string;
  readonly desiredCount?: number;
  readonly containerPort?: number;
  readonly prodTargetGroup: ITargetGroup;
  readonly testTargetGroup: ITargetGroup;
  readonly taskDefinition: DummyTaskDefinition;
  readonly enableExecuteCommand?: boolean;

  /**
   * The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy
   * Elastic Load Balancing target health checks after a task has first started.
   *
   * @default - defaults to 60 seconds if at least one load balancer is in-use and it is not already set
   */
  readonly healthCheckGracePeriod?: Duration;

  /**
   * The maximum number of tasks, specified as a percentage of the Amazon ECS
   * service's DesiredCount value, that can run in a service during a
   * deployment.
   *
   * @default - 100 if daemon, otherwise 200
   */
  readonly maxHealthyPercent?: number;

  /**
   * The minimum number of tasks, specified as a percentage of
   * the Amazon ECS service's DesiredCount value, that must
   * continue to run and remain healthy during a deployment.
   *
   * @default - 0 if daemon, otherwise 50
   */
  readonly minHealthyPercent?: number;

  /**
   * Whether to enable the deployment circuit breaker. If this property is defined, circuit breaker will be implicitly
   * enabled.
   * @default - disabled
   */
  readonly circuitBreaker?: DeploymentCircuitBreaker;

  /**
   * Specifies whether to propagate the tags from the task definition or the service to the tasks in the service. If no value is specified, the tags aren't propagated.
   * @default - no propagate
   */
  readonly propagateTags?: PropagateTags;
}

export class EcsService extends Construct implements IConnectable, IEcsService, ITaggable {
  public readonly clusterName: string;
  public readonly serviceName: string;
  public readonly connections: Connections;
  public readonly tags: TagManager;

  constructor(scope: Construct, id: string, props: EcsServiceProps) {
    super(scope, id);

    const {
      cluster,
      serviceName,
      launchType = LaunchType.FARGATE,
      platformVersion = '1.4.0',
      desiredCount = 1,
      prodTargetGroup,
      testTargetGroup,
      taskDefinition,
      healthCheckGracePeriod = Duration.seconds(60),
      enableExecuteCommand = false,
    } = props;

    this.tags = new TagManager(TagType.KEY_VALUE, 'TagManager');

    const containerPort = props.containerPort ?? taskDefinition.containerPort;

    const { vpc } = cluster;

    this.node.addDependency(prodTargetGroup, testTargetGroup);

    const securityGroups = props.securityGroups || [
      new SecurityGroup(this, 'SecurityGroup', {
        description: `Security group for ${this.node.id} service`,
        vpc,
      }),
    ];

    const serviceToken = new Function(this, 'Function', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'ecs-service')),
      handler: 'index.handler',
      timeout: Duration.minutes(15),
    });

    serviceToken.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ecs:CreateService', 'ecs:UpdateService', 'ecs:DeleteService', 'ecs:DescribeServices', 'ecs:TagResource', 'ecs:UntagResource'],
        resources: ['*'],
      }),
    );

    serviceToken.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['iam:PassRole'],
        resources: [taskDefinition.executionRole.roleArn],
      }),
    );

    const service = new CustomResource(this, 'CustomResource', {
      serviceToken: serviceToken.functionArn,
      resourceType: 'Custom::BlueGreenService',
      properties: {
        Cluster: cluster.clusterName,
        ServiceName: serviceName,
        ContainerName: taskDefinition.containerName,
        TaskDefinition: taskDefinition.taskDefinitionArn,
        LaunchType: launchType,
        PlatformVersion: platformVersion,
        DesiredCount: desiredCount,
        Subnets: vpc.privateSubnets.map((sn) => sn.subnetId),
        SecurityGroups: securityGroups.map((sg) => sg.securityGroupId),
        TargetGroupArn: prodTargetGroup.targetGroupArn,
        ContainerPort: containerPort,
        SchedulingStrategy: SchedulingStrategy.REPLICA,
        HealthCheckGracePeriodSeconds: healthCheckGracePeriod.toSeconds(),
        EnableExecuteCommand: enableExecuteCommand,
        PropagateTags: props.propagateTags,
        DeploymentConfiguration: {
          maximumPercent: props.maxHealthyPercent ?? 200,
          minimumHealthyPercent: props.minHealthyPercent ?? 50,
          deploymentCircuitBreaker: props.circuitBreaker
            ? {
                enable: true,
                rollback: props.circuitBreaker.rollback ?? false,
              }
            : undefined,
        },
        Tags: Lazy.any({ produce: () => this.tags.renderTags() }),
      },
    });

    service.node.addDependency(prodTargetGroup.loadBalancerAttached);

    this.serviceName = service.getAttString('ServiceName');
    this.clusterName = cluster.clusterName;

    this.connections = new Connections({
      securityGroups,
      defaultPort: Port.tcp(containerPort),
    });
  }
}

export enum SchedulingStrategy {
  REPLICA = 'REPLICA',
  DAEMON = 'DAEMON',
}

export enum PropagateTags {
  TASK_DEFINITION = 'TASK_DEFINITION',
  SERVICE = 'SERVICE',
}
