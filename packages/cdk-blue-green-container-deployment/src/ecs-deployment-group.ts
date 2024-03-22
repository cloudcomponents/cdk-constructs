import * as path from 'path';
import { Resource, IResource, CustomResource, Duration, ITaggable, TagType, TagManager, Lazy } from 'aws-cdk-lib';
import { EcsApplication, IEcsApplication } from 'aws-cdk-lib/aws-codedeploy';
import { ApplicationTargetGroup } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Role, ServicePrincipal, ManagedPolicy, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

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
  /**
   * The CodeDeploy Application to associate to the DeploymentGroup.
   *
   * @default - create a new CodeDeploy Application.
   */
  readonly application?: IEcsApplication;

  /**
   * The name to use for the implicitly created CodeDeploy Application.
   *
   * @default - uses auto-generated name
   * @deprecated Use {@link application} instead to create a custom CodeDeploy Application.
   */
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

export class EcsDeploymentGroup extends Resource implements IEcsDeploymentGroup, ITaggable {
  public readonly application: IEcsApplication;
  public readonly deploymentGroupName: string;
  public readonly deploymentGroupArn: string;
  public readonly deploymentConfig: IEcsDeploymentConfig;
  public readonly tags: TagManager;

  constructor(scope: Construct, id: string, props: EcsDeploymentGroupProps) {
    super(scope, id);

    this.tags = new TagManager(TagType.KEY_VALUE, 'TagManager');

    const {
      application,
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

    if (application) {
      this.application = application;
    } else {
      this.application = new EcsApplication(this, 'EcsApplication', {
        applicationName: props.applicationName, // support deprecated applicationName prop
      });
    }

    const serviceToken = new Function(this, 'Function', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'ecs-deployment-group')),
      handler: 'index.handler',
      timeout: Duration.minutes(15),
    });

    serviceToken.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'codeDeploy:CreateDeploymentGroup',
          'codeDeploy:UpdateDeploymentGroup',
          'codeDeploy:DeleteDeploymentGroup',
          'codeDeploy:TagResource',
          'codeDeploy:UntagResource',
        ],
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
        Tags: Lazy.any({ produce: () => this.tags.renderTags() }),
      },
    });

    this.deploymentGroupName = ecsDeploymentGroup.ref;
    this.deploymentGroupArn = ecsDeploymentGroup.getAttString('Arn');
  }
}

export enum RollbackEvent {
  DEPLOYMENT_FAILURE = 'DEPLOYMENT_FAILURE',
  DEPLOYMENT_STOP_ON_ALARM = 'DEPLOYMENT_STOP_ON_ALARM',
  DEPLOYMENT_STOP_ON_REQUEST = 'DEPLOYMENT_STOP_ON_REQUEST',
}
