import { CfnDeploymentConfig } from '@aws-cdk/aws-codedeploy';
import { Aws, Construct, IResolvable, Resource } from '@aws-cdk/core';

export interface IEcsDeploymentConfig {
  readonly deploymentConfigName: string;
  readonly deploymentConfigArn: string;
}

export interface EcsDeploymentConfigurationProps {
  /**
   * `AWS::CodeDeploy::DeploymentConfig.DeploymentConfigName`.
   *
   * @external
   * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html#cfn-codedeploy-deploymentconfig-deploymentconfigname
   */
  readonly deploymentConfigName?: string;
  /**
   * `AWS::CodeDeploy::DeploymentConfig.MinimumHealthyHosts`.
   *
   * @external
   * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html#cfn-codedeploy-deploymentconfig-minimumhealthyhosts
   */
  readonly minimumHealthyHosts?: CfnDeploymentConfig.MinimumHealthyHostsProperty | IResolvable;
  /**
   * `AWS::CodeDeploy::DeploymentConfig.TrafficRoutingConfig`.
   *
   * @external
   * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html#cfn-codedeploy-deploymentconfig-trafficroutingconfig
   */
  readonly trafficRoutingConfig?: CfnDeploymentConfig.TrafficRoutingConfigProperty | IResolvable;
}

export class EcsDeploymentConfig extends Resource implements IEcsDeploymentConfig {
  public static readonly LINEAR_10PERCENT_EVERY_1MINUTE = deploymentConfig('CodeDeployDefault.ECSLinear10PercentEvery1Minutes');
  public static readonly LINEAR_10PERCENT_EVERY_3MINUTES = deploymentConfig('CodeDeployDefault.ECSLinear10PercentEvery3Minutes');
  public static readonly CANARY_10PERCENT_5MINUTES = deploymentConfig('CodeDeployDefault.ECSCanary10Percent5Minutes');
  public static readonly CANARY_10PERCENT_15MINUTES = deploymentConfig('CodeDeployDefault.ECSCanary10Percent15Minutes');
  public static readonly ALL_AT_ONCE = deploymentConfig('CodeDeployDefault.ECSAllAtOnce');

  /**
   * Import a custom Deployment Configuration for an ECS Deployment Group defined outside the CDK.
   *
   * @param _scope the parent Construct for this new Construct
   * @param _id the logical ID of this new Construct
   * @param ecsDeploymentConfigName the name of the referenced custom Deployment Configuration
   * @returns a Construct representing a reference to an existing custom Deployment Configuration
   */
  public static fromEcsDeploymentConfigName(_scope: Construct, _id: string, ecsDeploymentConfigName: string): IEcsDeploymentConfig {
    return deploymentConfig(ecsDeploymentConfigName);
  }

  public readonly deploymentConfigName: string;
  public readonly deploymentConfigArn: string;

  constructor(scope: Construct, id: string, props: EcsDeploymentConfigurationProps) {
    super(scope, id);

    const cfnDeploymentConfig = new CfnDeploymentConfig(this, 'EcsDeploymentConfiguration', {
      computePlatform: 'ECS',
      ...props,
    });

    this.deploymentConfigName = cfnDeploymentConfig.ref;
    this.deploymentConfigArn = arnForDeploymentConfig(this.deploymentConfigName);
  }
}

function deploymentConfig(name: string): IEcsDeploymentConfig {
  return {
    deploymentConfigName: name,
    deploymentConfigArn: arnForDeploymentConfig(name),
  };
}

function arnForDeploymentConfig(name: string): string {
  return `arn:${Aws.PARTITION}:codedeploy:${Aws.REGION}:${Aws.ACCOUNT_ID}:deploymentconfig:${name}`;
}
