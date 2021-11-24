import type { CloudFormationCustomResourceEvent, CloudFormationCustomResourceUpdateEvent } from 'aws-lambda';
import { CodeDeploy } from 'aws-sdk';
import {
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler,
  ResourceHandler,
  ResourceHandlerReturn,
} from 'custom-resource-helper';

enum RollbackEvent {
  DEPLOYMENT_FAILURE = 'DEPLOYMENT_FAILURE',
  DEPLOYMENT_STOP_ON_ALARM = 'DEPLOYMENT_STOP_ON_ALARM',
  DEPLOYMENT_STOP_ON_REQUEST = 'DEPLOYMENT_STOP_ON_REQUEST',
}

export interface EcsDeploymentGroupProps {
  applicationName: string;
  deploymentGroupName: string;
  serviceRoleArn: string;
  ecsServices: CodeDeploy.ECSServiceList;
  targetGroupNames: string[];
  prodTrafficListenerArn: string;
  testTrafficListenerArn: string;
  terminationWaitTimeInMinutes: number;
  tags: CodeDeploy.Tag[];
  autoRollbackOnEvents?: RollbackEvent[];
  deploymentConfigName?: string;
}

interface ArnParts {
  awsPartition: string;
  awsRegion: string;
  awsAccountId: string;
}

const codeDeploy = new CodeDeploy();

const getProperties = (
  props: CloudFormationCustomResourceEvent['ResourceProperties'] | CloudFormationCustomResourceUpdateEvent['OldResourceProperties'],
): EcsDeploymentGroupProps => ({
  applicationName: props.ApplicationName,
  deploymentGroupName: props.DeploymentGroupName,
  serviceRoleArn: props.ServiceRoleArn,
  ecsServices: props.EcsServices.map(({ ClusterName, ServiceName }: { ClusterName: string; ServiceName: string }) => ({
    clusterName: ClusterName,
    serviceName: ServiceName,
  })),
  targetGroupNames: props.TargetGroupNames,
  prodTrafficListenerArn: props.ProdTrafficListenerArn,
  testTrafficListenerArn: props.TestTrafficListenerArn,
  terminationWaitTimeInMinutes: props.TerminationWaitTimeInMinutes,
  autoRollbackOnEvents: props.AutoRollbackOnEvents,
  deploymentConfigName: props.DeploymentConfigName,
  tags: props.Tags ?? [],
});

export const handleCreate: OnCreateHandler = async (event, context): Promise<ResourceHandlerReturn> => {
  const {
    applicationName,
    deploymentGroupName,
    serviceRoleArn,
    ecsServices,
    targetGroupNames,
    prodTrafficListenerArn,
    testTrafficListenerArn,
    terminationWaitTimeInMinutes,
    autoRollbackOnEvents,
    deploymentConfigName,
    tags,
  } = getProperties(event.ResourceProperties);

  await codeDeploy
    .createDeploymentGroup({
      applicationName,
      deploymentGroupName,
      serviceRoleArn,
      ecsServices,
      loadBalancerInfo: {
        targetGroupPairInfoList: [
          {
            prodTrafficRoute: {
              listenerArns: [prodTrafficListenerArn],
            },
            testTrafficRoute: {
              listenerArns: [testTrafficListenerArn],
            },
            targetGroups: targetGroupNames.map((name) => ({
              name,
            })),
          },
        ],
      },
      autoRollbackConfiguration: {
        enabled: !!autoRollbackOnEvents,
        events: autoRollbackOnEvents,
      },
      blueGreenDeploymentConfiguration: {
        terminateBlueInstancesOnDeploymentSuccess: {
          action: 'TERMINATE',
          terminationWaitTimeInMinutes,
        },
        deploymentReadyOption: {
          actionOnTimeout: 'CONTINUE_DEPLOYMENT',
        },
      },
      deploymentStyle: {
        deploymentType: 'BLUE_GREEN',
        deploymentOption: 'WITH_TRAFFIC_CONTROL',
      },
      deploymentConfigName: deploymentConfigName ?? 'CodeDeployDefault.ECSAllAtOnce',
      tags,
    })
    .promise();

  return {
    physicalResourceId: deploymentGroupName,
    responseData: {
      Arn: arnForDeploymentGroup(applicationName, deploymentGroupName, extractArnParts(context.invokedFunctionArn))
    },
  };
};

export const handleUpdate: OnUpdateHandler = async (event, context): Promise<ResourceHandlerReturn> => {
  const newProps = getProperties(event.ResourceProperties);
  const oldProps = getProperties(event.OldResourceProperties);
  const deploymentGroupArn = arnForDeploymentGroup(newProps.applicationName, newProps.deploymentGroupName, extractArnParts(context.invokedFunctionArn));

  await codeDeploy
    .updateDeploymentGroup({
      applicationName: oldProps.applicationName,
      currentDeploymentGroupName: oldProps.deploymentGroupName,
      newDeploymentGroupName: newProps.deploymentGroupName,
      ecsServices: newProps.ecsServices,
      loadBalancerInfo: {
        targetGroupPairInfoList: [
          {
            prodTrafficRoute: {
              listenerArns: [newProps.prodTrafficListenerArn],
            },
            testTrafficRoute: {
              listenerArns: [newProps.testTrafficListenerArn],
            },
            targetGroups: newProps.targetGroupNames.map((name) => ({
              name,
            })),
          },
        ],
      },
      autoRollbackConfiguration: {
        enabled: !!newProps.autoRollbackOnEvents,
        events: newProps.autoRollbackOnEvents,
      },
      blueGreenDeploymentConfiguration: {
        terminateBlueInstancesOnDeploymentSuccess: {
          action: 'TERMINATE',
          terminationWaitTimeInMinutes: newProps.terminationWaitTimeInMinutes,
        },
        deploymentReadyOption: {
          actionOnTimeout: 'CONTINUE_DEPLOYMENT',
        },
      },
      deploymentConfigName: newProps.deploymentConfigName,
    })
    .promise();

  const newTagKeys: string[] = newProps.tags.map((t: any) => t.Key);
  const removableTagKeys: string[] = oldProps.tags.map((t: any) => t.Key).filter((t) => !newTagKeys.includes(t));

  if (removableTagKeys.length > 0) {
    await codeDeploy
      .untagResource({
        ResourceArn: deploymentGroupArn,
        TagKeys: removableTagKeys,
      })
      .promise();
  }

  if (newProps.tags.length > 0) {
    await codeDeploy
      .tagResource({
        ResourceArn: deploymentGroupArn,
        Tags: newProps.tags,
      })
      .promise();
  }

  return {
    physicalResourceId: newProps.deploymentGroupName,
    responseData: {
      Arn: deploymentGroupArn
    },
  };
};

const handleDelete: OnDeleteHandler = async (event): Promise<void> => {
  const { applicationName, deploymentGroupName } = getProperties(event.ResourceProperties);

  await codeDeploy
    .deleteDeploymentGroup({
      applicationName,
      deploymentGroupName,
    })
    .promise();
};

const extractArnParts = (invokedFunctionArn: string): ArnParts => {
  const matcher = invokedFunctionArn.match(/arn:(?<partition>\w+):lambda:(?<region>[\w\-]+):(?<accountId>\d+):.*/);
  if(!matcher || !matcher.groups || !matcher.groups.partition || !matcher.groups.region || !matcher.groups.accountId) {
    throw new Error(`Unable to extract necessary parts from function name. (${invokedFunctionArn}).`)
  }
  return {
    awsPartition: matcher.groups.partition,
    awsRegion: matcher.groups.region,
    awsAccountId: matcher.groups.accountId
  }
}

const arnForDeploymentGroup = (applicationName: string, deploymentGroupName: string, arnParts: ArnParts): string => {
  return `arn:${arnParts.awsPartition}:codedeploy:${arnParts.awsRegion}:${arnParts.awsAccountId}:deploymentgroup:${applicationName}/${deploymentGroupName}`
}

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
