import * as path from 'path';
import { IConnectable, Connections, SecurityGroup, Port } from '@aws-cdk/aws-ec2';
import { ICluster, LaunchType, DeploymentCircuitBreaker } from '@aws-cdk/aws-ecs';
import { ITargetGroup } from '@aws-cdk/aws-elasticloadbalancingv2';
import { Effect } from '@aws-cdk/aws-iam';
import { Duration, Construct, CustomResource, CustomResourceProvider, CustomResourceProviderRuntime } from '@aws-cdk/core';

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
  readonly taskDefinition: DummyTaskDefinition;

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
}

export class EcsService extends Construct implements IConnectable, IEcsService {
  public readonly clusterName: string;
  public readonly serviceName: string;
  public readonly connections: Connections;

  constructor(scope: Construct, id: string, props: EcsServiceProps) {
    super(scope, id);

    const {
      cluster,
      serviceName,
      launchType = LaunchType.FARGATE,
      platformVersion = '1.4.0',
      desiredCount = 1,
      prodTargetGroup,
      taskDefinition,
      healthCheckGracePeriod = Duration.seconds(60),
    } = props;

    const containerPort = props.containerPort ?? taskDefinition.containerPort;

    const { vpc } = cluster;

    const securityGroups = props.securityGroups || [
      new SecurityGroup(this, 'SecurityGroup', {
        description: `Security group for ${this.node.id} service`,
        vpc,
      }),
    ];

    const serviceToken = CustomResourceProvider.getOrCreate(this, 'Custom::BlueGreenService', {
      codeDirectory: path.join(__dirname, 'lambdas', 'ecs-service'),
      runtime: CustomResourceProviderRuntime.NODEJS_12_X,
      policyStatements: [
        {
          Effect: Effect.ALLOW,
          Action: ['ecs:CreateService', 'ecs:UpdateService', 'ecs:DeleteService', 'ecs:DescribeServices'],
          Resource: '*',
        },
        {
          Effect: Effect.ALLOW,
          Action: ['iam:PassRole'],
          Resource: taskDefinition.executionRole.roleArn,
        },
      ],
    });

    const service = new CustomResource(this, 'CustomResource', {
      serviceToken,
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
        HealthCheckGracePeriod: healthCheckGracePeriod.toSeconds(),
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
