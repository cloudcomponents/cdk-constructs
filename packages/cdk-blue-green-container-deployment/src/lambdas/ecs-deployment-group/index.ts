import {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { CodeDeploy } from 'aws-sdk';

import { RollbackEvent } from '../../ecs-deployment-group';

interface HandlerReturn {
  PhysicalResourceId: string;
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
  autoRollbackOnEvents?: RollbackEvent[];
}

const codeDeploy = new CodeDeploy();

const getProperties = (
  props:
    | CloudFormationCustomResourceEvent['ResourceProperties']
    | CloudFormationCustomResourceUpdateEvent['OldResourceProperties'],
): EcsDeploymentGroupProps => ({
  applicationName: props.ApplicationName,
  deploymentGroupName: props.DeploymentGroupName,
  serviceRoleArn: props.ServiceRoleArn,
  ecsServices: props.EcsServices.map(
    ({
      ClusterName,
      ServiceName,
    }: {
      ClusterName: string;
      ServiceName: string;
    }) => ({
      clusterName: ClusterName,
      serviceName: ServiceName,
    }),
  ),
  targetGroupNames: props.TargetGroupNames,
  prodTrafficListenerArn: props.ProdTrafficListenerArn,
  testTrafficListenerArn: props.TestTrafficListenerArn,
  terminationWaitTimeInMinutes: props.TerminationWaitTimeInMinutes,
  autoRollbackOnEvents: props.AutoRollbackOnEvents,
});

const onCreate = async (
  event: CloudFormationCustomResourceCreateEvent,
): Promise<HandlerReturn> => {
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
    })
    .promise();

  return {
    PhysicalResourceId: deploymentGroupName,
  };
};

const onUpdate = async (
  event: CloudFormationCustomResourceUpdateEvent,
): Promise<HandlerReturn> => {
  const newProps = getProperties(event.ResourceProperties);
  const oldProps = getProperties(event.OldResourceProperties);

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
    })
    .promise();

  return {
    PhysicalResourceId: newProps.deploymentGroupName,
  };
};

const onDelete = async (
  event: CloudFormationCustomResourceDeleteEvent,
): Promise<void> => {
  const { applicationName, deploymentGroupName } = getProperties(
    event.ResourceProperties,
  );

  await codeDeploy
    .deleteDeploymentGroup({
      applicationName,
      deploymentGroupName,
    })
    .promise();
};

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<HandlerReturn | void> => {
  const requestType = event.RequestType;

  switch (requestType) {
    case 'Create':
      return onCreate(event as CloudFormationCustomResourceCreateEvent);
    case 'Update':
      return onUpdate(event as CloudFormationCustomResourceUpdateEvent);
    case 'Delete':
      return onDelete(event as CloudFormationCustomResourceDeleteEvent);
    default:
      throw new Error(`Invalid request type: ${requestType}`);
  }
};
