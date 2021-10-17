import * as path from 'path';
import { EcsApplication, IEcsApplication } from '@aws-cdk/aws-codedeploy';
import { ApplicationTargetGroup } from '@aws-cdk/aws-elasticloadbalancingv2';
import { Role, ServicePrincipal, ManagedPolicy, Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Aws, Construct, Resource, IResource, CustomResource, Duration } from '@aws-cdk/core';

import { EcsDeploymentConfig, IEcsDeploymentConfig } from './ecs-deployment-config';
import { IEcsService } from './ecs-service';

export interface TrafficListener {
  /**
   * ARN of the listener
   * @attribute
   */
  readonly listenerArn: string;
}

/**
 * Interface for an ECS deployment group.
 */
export interface IEcsDeploymentGroup extends IResource {
  /**
   * The reference to the CodeDeploy ECS Application that this Deployment Group belongs to.
   */
  readonly application: IEcsApplication;

  /**
   * The physical name of the CodeDeploy Deployment Group.
   */
  readonly deploymentGroupName: string;

  /**
   * The ARN of this Deployment Group.
   */
  readonly deploymentGroupArn: string;

  /**
   * The Deployment Configuration this Group uses.
   */
  readonly deploymentConfig: IEcsDeploymentConfig;
}

export interface EcsDeploymentGroupProps {
  readonly applicationName?: string;

  readonly deploymentGroupName: string;

  readonly deploymentConfig?: IEcsDeploymentConfig;

  readonly ecsServices: IEcsService[];

  readonly targetGroups: ApplicationTargetGroup[];

  readonly prodTrafficListener: TrafficListener;

  readonly testTrafficListener: TrafficListener;

  /**
   * the number of minutes before deleting the original (blue) task set.
   * During an Amazon ECS deployment, CodeDeploy shifts traffic from the
   * original (blue) task set to a replacement (green) task set.
   *
   * The maximum setting is 2880 minutes (2 days).
   *
   * @default 60 minutes
   */
  readonly terminationWaitTime?: Duration;

  /**
   * The event type or types that trigger a rollback.
   */
  readonly autoRollbackOnEvents?: RollbackEvent[];
}

export class EcsDeploymentGroup extends Resource implements IEcsDeploymentGroup {
  public readonly application: IEcsApplication;
  public readonly deploymentGroupName: string;
  public readonly deploymentGroupArn: string;
  public readonly deploymentConfig: IEcsDeploymentConfig;

  constructor(scope: Construct, id: string, props: EcsDeploymentGroupProps) {
    super(scope, id);

    const {
      applicationName,
      deploymentGroupName,
      deploymentConfig,
      ecsServices,
      targetGroups,
      prodTrafficListener,
      testTrafficListener,
      terminationWaitTime = Duration.minutes(60),
      autoRollbackOnEvents,
    } = props;

    if (terminationWaitTime.toMinutes() > 2880) {
      throw new Error('Invalid TerminationWaitTimeInMinutes: The maximum setting is 2880 minutes (2 days).');
    }

    const codeDeployEcsRole = new Role(this, 'Role', {
      assumedBy: new ServicePrincipal('codedeploy.amazonaws.com'),
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployRoleForECS')],
    });

    this.application = new EcsApplication(this, 'EcsApplication', {
      applicationName,
    });

    const serviceToken = new Function(this, 'Function', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'ecs-deployment-group')),
      handler: 'index.handler',
      timeout: Duration.minutes(15),
    });

    serviceToken.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['codeDeploy:CreateDeploymentGroup', 'codeDeploy:UpdateDeploymentGroup', 'codeDeploy:DeleteDeploymentGroup'],
        resources: ['*'],
      }),
    );

    serviceToken.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['iam:PassRole'],
        resources: [codeDeployEcsRole.roleArn],
      }),
    );

    this.deploymentConfig = deploymentConfig || EcsDeploymentConfig.ALL_AT_ONCE;

    if (Construct.isConstruct(props.deploymentConfig)) {
      this.node.addDependency(props.deploymentConfig);
    }
    this.node.addDependency(...ecsServices);

    const ecsDeploymentGroup = new CustomResource(this, 'CustomResource', {
      serviceToken: serviceToken.functionArn,
      resourceType: 'Custom::EcsDeploymentGroup',
      properties: {
        ApplicationName: this.application.applicationName,
        DeploymentGroupName: deploymentGroupName,
        ServiceRoleArn: codeDeployEcsRole.roleArn,
        TargetGroupNames: targetGroups.map((tg) => tg.targetGroupName),
        EcsServices: ecsServices.map((service) => ({
          ClusterName: service.clusterName,
          ServiceName: service.serviceName,
        })),
        ProdTrafficListenerArn: prodTrafficListener.listenerArn,
        TestTrafficListenerArn: testTrafficListener.listenerArn,
        TerminationWaitTimeInMinutes: terminationWaitTime.toMinutes(),
        AutoRollbackOnEvents: autoRollbackOnEvents,
        DeploymentConfigName: this.deploymentConfig.deploymentConfigName,
      },
    });

    this.deploymentGroupName = ecsDeploymentGroup.ref;
    this.deploymentGroupArn = this.arnForDeploymentGroup(this.application.applicationName, this.deploymentGroupName);
  }

  private arnForDeploymentGroup(applicationName: string, deploymentGroupName: string): string {
    return `arn:${Aws.PARTITION}:codedeploy:${Aws.REGION}:${Aws.ACCOUNT_ID}:deploymentgroup:${applicationName}/${deploymentGroupName}`;
  }
}

export enum RollbackEvent {
  DEPLOYMENT_FAILURE = 'DEPLOYMENT_FAILURE',
  DEPLOYMENT_STOP_ON_ALARM = 'DEPLOYMENT_STOP_ON_ALARM',
  DEPLOYMENT_STOP_ON_REQUEST = 'DEPLOYMENT_STOP_ON_REQUEST',
}
