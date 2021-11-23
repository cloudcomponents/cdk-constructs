import { NetworkMode } from '@aws-cdk/aws-ecs';
import { Role, ServicePrincipal, ManagedPolicy, PolicyStatement, Effect, IRole } from '@aws-cdk/aws-iam';
import { Construct } from '@aws-cdk/core';
import { AwsCustomResource, AwsCustomResourcePolicy, AwsSdkCall, PhysicalResourceId, PhysicalResourceIdReference } from '@aws-cdk/custom-resources';

export interface IDummyTaskDefinition {
  readonly executionRole: IRole;

  readonly family: string;

  readonly taskDefinitionArn: string;

  readonly containerName: string;

  readonly containerPort: number;
}
export interface DummyTaskDefinitionProps {
  /**
   * The name of a family that this task definition is registered to. A family groups multiple versions of a task definition.
   *
   * @default - Automatically generated name.
   */
  readonly family?: string;

  /**
   * The image used to start a container.
   */
  readonly image: string;

  /**
   * The name of the container.
   *
   * @default `sample-website`
   */
  readonly containerName?: string;

  /**
   * @default 80
   */
  readonly containerPort?: number;
}

export class DummyTaskDefinition extends Construct implements IDummyTaskDefinition {
  public readonly executionRole: IRole;

  public readonly family: string;

  public readonly taskDefinitionArn: string;

  public readonly containerName: string;

  public readonly containerPort: number;

  constructor(scope: Construct, id: string, props: DummyTaskDefinitionProps) {
    super(scope, id);

    this.executionRole = new Role(this, 'ExecutionRole', {
      assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')],
    });

    this.family = props.family ?? this.node.addr;
    this.containerName = props.containerName ?? 'sample-website';
    this.containerPort = props.containerPort ?? 80;

    const registerTaskDefinition: AwsSdkCall = {
      service: 'ECS',
      action: 'registerTaskDefinition',
      parameters: {
        requiresCompatibilities: ['FARGATE'],
        family: this.family,
        executionRoleArn: this.executionRole.roleArn,
        networkMode: NetworkMode.AWS_VPC,
        cpu: '256',
        memory: '512',
        containerDefinitions: [
          {
            name: this.containerName,
            image: props.image,
            portMappings: [
              {
                hostPort: this.containerPort,
                protocol: 'tcp',
                containerPort: this.containerPort,
              },
            ],
          },
        ],
      },
      physicalResourceId: PhysicalResourceId.fromResponse('taskDefinition.taskDefinitionArn'),
    };

    const deregisterTaskDefinition: AwsSdkCall = {
      service: 'ECS',
      action: 'deregisterTaskDefinition',
      parameters: {
        taskDefinition: new PhysicalResourceIdReference(),
      },
    };

    const taskDefinition = new AwsCustomResource(this, 'DummyTaskDefinition', {
      resourceType: 'Custom::DummyTaskDefinition',
      onCreate: registerTaskDefinition,
      onUpdate: registerTaskDefinition,
      onDelete: deregisterTaskDefinition,
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['ecs:RegisterTaskDefinition', 'ecs:DeregisterTaskDefinition'],
          resources: ['*'],
        }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['iam:PassRole'],
          resources: [this.executionRole.roleArn],
        }),
      ]),
    });

    this.taskDefinitionArn = taskDefinition.getResponseField('taskDefinition.taskDefinitionArn');
  }

  /**
   * Adds a policy statement to the task execution IAM role.
   */
  public addToExecutionRolePolicy(statement: PolicyStatement): void {
    this.executionRole.addToPrincipalPolicy(statement);
  }
}
