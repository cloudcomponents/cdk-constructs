import * as path from 'path';
import {
  Role,
  ServicePrincipal,
  ManagedPolicy,
  Effect,
} from '@aws-cdk/aws-iam';
import {
  EcsApplication,
  IEcsDeploymentGroup,
  IEcsApplication,
  IEcsDeploymentConfig,
  EcsDeploymentConfig,
} from '@aws-cdk/aws-codedeploy';
import {
  Aws,
  Construct,
  Resource,
  CustomResource,
  CustomResourceProvider,
  CustomResourceProviderRuntime,
} from '@aws-cdk/core';

interface EcsService {
  clusterName: string;
  serviceName: string;
}

export interface EcsDeploymentGroupProps {
  readonly applicationName?: string;

  readonly deploymentGroupName: string;

  readonly deploymentConfig?: IEcsDeploymentConfig;

  readonly ecsServices: EcsService[];

  readonly targetGroupNames: string[];

  readonly prodTrafficListenerArn: string;

  readonly testTrafficListenerArn: string;

  /**
   * the number of minutes before deleting the original (blue) task set.
   * During an Amazon ECS deployment, CodeDeploy shifts traffic from the
   * original (blue) task set to a replacement (green) task set.
   *
   * The maximum setting is 2880 minutes (2 days).
   *
   * @default 60
   */
  readonly terminationWaitTimeInMinutes?: number;
}

export class EcsDeploymentGroup extends Resource
  implements IEcsDeploymentGroup {
  public readonly application: IEcsApplication;
  public readonly deploymentGroupName: string;
  public readonly deploymentGroupArn: string;
  public readonly deploymentConfig: IEcsDeploymentConfig;

  constructor(parent: Construct, id: string, props: EcsDeploymentGroupProps) {
    super(parent, id);

    const {
      applicationName,
      deploymentGroupName,
      deploymentConfig,
      ecsServices,
      targetGroupNames,
      prodTrafficListenerArn,
      testTrafficListenerArn,
      terminationWaitTimeInMinutes = 60,
    } = props;

    if (terminationWaitTimeInMinutes > 2880) {
      throw new Error(
        'Invalid TerminationWaitTimeInMinutes: The maximum setting is 2880 minutes (2 days).'
      );
    }

    const codeDeployEcsRole = new Role(this, 'EcsCodeDeployRole', {
      assumedBy: new ServicePrincipal('codedeploy.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('AWSCodeDeployRoleForECS'),
      ],
    });

    this.application = new EcsApplication(this, 'EcsApplication', {
      applicationName,
    });

    const serviceToken = CustomResourceProvider.getOrCreate(
      this,
      'Custom::EcsDeploymentGroup',
      {
        codeDirectory: path.join(__dirname, 'lambdas', 'ecs-deployment-group'),
        runtime: CustomResourceProviderRuntime.NODEJS_12,
        policyStatements: [
          {
            Effect: Effect.ALLOW,
            Action: [
              'codeDeploy:CreateDeploymentGroup',
              'codeDeploy:UpdateDeploymentGroup',
              'codeDeploy:DeleteDeploymentGroup',
            ],
            Resource: '*',
          },
          {
            Effect: Effect.ALLOW,
            Action: ['iam:PassRole'],
            Resource: codeDeployEcsRole.roleArn,
          },
        ],
      }
    );

    const ecsDeploymentGroup = new CustomResource(this, 'CustomResource', {
      serviceToken,
      resourceType: 'Custom::EcsDeploymentGroup',
      properties: {
        ApplicationName: this.application.applicationName,
        DeploymentGroupName: deploymentGroupName,
        ServiceRoleArn: codeDeployEcsRole.roleArn,
        TargetGroupNames: targetGroupNames,
        EcsServices: ecsServices.map((service) => ({
          ClusterName: service.clusterName,
          ServiceName: service.serviceName,
        })),
        ProdTrafficListenerArn: prodTrafficListenerArn,
        TestTrafficListenerArn: testTrafficListenerArn,
        TerminationWaitTimeInMinutes: terminationWaitTimeInMinutes,
      },
    });

    this.deploymentGroupName = ecsDeploymentGroup.ref;
    this.deploymentGroupArn = this.arnForDeploymentGroup(
      this.application.applicationName,
      this.deploymentGroupName
    );
    this.deploymentConfig = deploymentConfig || EcsDeploymentConfig.ALL_AT_ONCE;
  }

  private arnForDeploymentGroup(
    applicationName: string,
    deploymentGroupName: string
  ): string {
    return `arn:${Aws.PARTITION}:codedeploy:${Aws.REGION}:${Aws.ACCOUNT_ID}:deploymentgroup:${applicationName}/${deploymentGroupName}`;
  }
}
