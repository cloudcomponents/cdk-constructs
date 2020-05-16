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
    IApplicationLoadBalancer,
    IApplicationTargetGroup,
} from '@aws-cdk/aws-elasticloadbalancingv2';
import { ICluster, LaunchType } from '@aws-cdk/aws-ecs';
import { Effect } from '@aws-cdk/aws-iam';

import { DummyTaskDefinition } from './dummy-task-definition';

export enum SchedulingStrategy {
    REPLICA = 'REPLICA',
    DAEMON = 'DAEMON',
}

export interface BlueGreenServiceProps {
    securityGroups?: SecurityGroup[];
    cluster: ICluster;
    serviceName: string;
    launchType?: LaunchType;
    platformVersion?: string;
    desiredCount?: number;
    containerPort?: number;
    prodTargetGroup: IApplicationTargetGroup;
    applicationLoadBalancer: IApplicationLoadBalancer;
    taskDefinition: DummyTaskDefinition;
}

export class BlueGreenService extends Construct implements IConnectable {
    public readonly serviceName: string;
    public readonly connections: Connections;

    constructor(parent: Construct, id: string, props: BlueGreenServiceProps) {
        super(parent, id);

        const {
            cluster,
            serviceName,
            launchType = LaunchType.FARGATE,
            platformVersion = '1.4.0',
            desiredCount = 1,
            containerPort = 80,
            applicationLoadBalancer,
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
                codeDirectory: path.join(
                    __dirname,
                    'lambdas',
                    'blue-green-service',
                ),
                runtime: CustomResourceProviderRuntime.NODEJS_12,
                policyStatements: [
                    {
                        Effect: Effect.ALLOW,
                        Action: [
                            'ecs:CreateService',
                            'ecs:UpdateService',
                            'ecs:DeleteService',
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

        service.node.addDependency(applicationLoadBalancer);

        this.serviceName = service.getAttString('ServiceName');

        this.connections = new Connections({
            securityGroups,
            defaultPort: Port.tcp(containerPort),
        });
    }
}
