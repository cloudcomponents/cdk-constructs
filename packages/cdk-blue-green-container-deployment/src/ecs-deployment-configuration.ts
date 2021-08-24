import { IEcsDeploymentConfig, CfnDeploymentConfig } from '@aws-cdk/aws-codedeploy';

import { Aws, Construct, IResolvable, Resource } from '@aws-cdk/core';

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

export class EcsDeploymentConfiguration extends Resource implements IEcsDeploymentConfig {
  readonly deploymentConfigName: string;
  readonly deploymentConfigArn: string;

  constructor(scope: Construct, id: string, props: EcsDeploymentConfigurationProps) {
    super(scope, id);

    const cfnDeploymentConfig = new CfnDeploymentConfig(this, 'EcsDeploymentConfiguration', {
      computePlatform: 'ECS',
      ...props,
    });

    const deployConfigurationName = props.deploymentConfigName ?? cfnDeploymentConfig.ref;

    this.deploymentConfigName = deployConfigurationName;
    this.deploymentConfigArn = this.arnForDeploymentConfig(deployConfigurationName);
  }

  private arnForDeploymentConfig(deploymentConfigurationName: string): string {
    return `arn:${Aws.PARTITION}:codedeploy:${Aws.REGION}:${Aws.ACCOUNT_ID}:deploymentconfig:${deploymentConfigurationName}`;
  }
}
