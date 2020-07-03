import * as path from 'path';
import {
  Construct,
  CustomResource,
  CustomResourceProvider,
  CustomResourceProviderRuntime,
} from '@aws-cdk/core';
import {
  IConnectable,
  Connections,
  SecurityGroup,
  Port,
} from '@aws-cdk/aws-ec2';
import {
  ITargetGroup,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import { ICluster, LaunchType } from '@aws-cdk/aws-ecs';
import { Effect } from '@aws-cdk/aws-iam';

import { DummyTaskDefinition } from './dummy-task-definition';

export interface IEcsService {
  clusterName: string;
  serviceName: string;
}

export interface EcsServiceProps {
  securityGroups?: SecurityGroup[];
  cluster: ICluster;
  serviceName: string;
  launchType?: LaunchType;
  platformVersion?: string;
  desiredCount?: number;
  containerPort?: number;
  prodTargetGroup: ITargetGroup;
  taskDefinition: DummyTaskDefinition;
}

export class EcsService extends Construct implements IConnectable, IEcsService {
  public readonly clusterName: string;
  public readonly serviceName: string;
  public readonly connections: Connections;

  constructor(parent: Construct, id: string, props: EcsServiceProps) {
    super(parent, id);

    const {
      cluster,
      serviceName,
      launchType = LaunchType.FARGATE,
      platformVersion = '1.4.0',
      desiredCount = 1,
      containerPort = 80,
      prodTargetGroup,
      taskDefinition,
    } = props;

    const { vpc } = cluster;

    const securityGroups = props.securityGroups || [
      new SecurityGroup(this, 'SecurityGroup', {
        description: `Security group for ${this.node.id} service`,
        vpc,
      }),
    ];

    const serviceToken = CustomResourceProvider.getOrCreate(
      this,
      'Custom::BlueGreenService',
      {
        codeDirectory: path.join(__dirname, 'lambdas', 'ecs-service'),
        runtime: CustomResourceProviderRuntime.NODEJS_12,
        policyStatements: [
          {
            Effect: Effect.ALLOW,
            Action: [
              'ecs:CreateService',
              'ecs:UpdateService',
              'ecs:DeleteService',
              'ecs:DescribeServices',
            ],
            Resource: '*',
          },
          {
            Effect: Effect.ALLOW,
            Action: ['iam:PassRole'],
            Resource: taskDefinition.executionRole.roleArn,
          },
        ],
      },
    );

    const service = new CustomResource(this, 'CustomResource', {
      serviceToken,
      resourceType: 'Custom::BlueGreenService',
      properties: {
        Cluster: cluster.clusterName,
        ServiceName: serviceName,
        TaskDefinition: taskDefinition.taskDefinitionArn,
        LaunchType: launchType,
        PlatformVersion: platformVersion,
        DesiredCount: desiredCount,
        Subnets: vpc.privateSubnets.map((sn) => sn.subnetId),
        SecurityGroups: securityGroups.map((sg) => sg.securityGroupId),
        TargetGroupArn: prodTargetGroup.targetGroupArn,
        ContainerPort: containerPort,
        SchedulingStrategy: SchedulingStrategy.REPLICA,
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
