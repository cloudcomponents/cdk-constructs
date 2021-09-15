import type {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { ECS } from 'aws-sdk';

interface HandlerReturn {
  PhysicalResourceId: string;
  Data: {
    ServiceName: string;
  };
}

export interface BlueGreenServiceProps {
  cluster: string;
  serviceName: string;
  containerName: string;
  taskDefinition: string;
  launchType: string;
  platformVersion: string;
  desiredCount: number;
  subnets: string[];
  securityGroups: string[];
  targetGroupArn: string;
  containerPort: number;
  schedulingStrategy: string;
  healthCheckGracePeriodSeconds: number;
  deploymentConfiguration: ECS.DeploymentConfiguration;
}

const ecs = new ECS();

const getProperties = (props: CloudFormationCustomResourceEvent['ResourceProperties']): BlueGreenServiceProps => ({
  cluster: props.Cluster,
  serviceName: props.ServiceName,
  containerName: props.ContainerName,
  taskDefinition: props.TaskDefinition,
  launchType: props.LaunchType,
  platformVersion: props.PlatformVersion,
  desiredCount: props.DesiredCount,
  subnets: props.Subnets,
  securityGroups: props.SecurityGroups,
  targetGroupArn: props.TargetGroupArn,
  containerPort: props.ContainerPort,
  schedulingStrategy: props.SchedulingStrategy,
  healthCheckGracePeriodSeconds: props.HealthCheckGracePeriodSeconds,
  deploymentConfiguration: props.DeploymentConfiguration,
});

const onCreate = async (event: CloudFormationCustomResourceCreateEvent): Promise<HandlerReturn> => {
  const {
    cluster,
    serviceName,
    containerName,
    taskDefinition,
    launchType,
    platformVersion,
    desiredCount,
    subnets,
    securityGroups,
    targetGroupArn,
    containerPort,
    schedulingStrategy,
    healthCheckGracePeriodSeconds,
    deploymentConfiguration,
  } = getProperties(event.ResourceProperties);

  const { service } = await ecs
    .createService({
      cluster,
      serviceName,
      taskDefinition,
      launchType,
      platformVersion,
      desiredCount,
      schedulingStrategy,
      deploymentController: {
        type: 'CODE_DEPLOY',
      },
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets,
          securityGroups,
        },
      },
      deploymentConfiguration,
      healthCheckGracePeriodSeconds,
      loadBalancers: [
        {
          targetGroupArn: targetGroupArn,
          containerPort,
          containerName,
        },
      ],
    })
    .promise();

  if (!service) throw Error('Service could not be created');

  return {
    PhysicalResourceId: service.serviceArn as string,
    Data: {
      ServiceName: service.serviceName as string,
    },
  };
};

/**
 * For services using the blue/green (CODE_DEPLOY) deployment controller,
 * only the desired count, deployment configuration, task placement constraints
 * and strategies, and health check grace period can be updated using this API.
 * If the network configuration, platform version, or task definition need to be
 * updated, a new AWS CodeDeploy deployment should be created.
 * For more information, see CreateDeployment in the AWS CodeDeploy API Reference.
 */
const onUpdate = async (event: CloudFormationCustomResourceUpdateEvent): Promise<HandlerReturn> => {
  const { cluster, serviceName, desiredCount, deploymentConfiguration, healthCheckGracePeriodSeconds } = getProperties(event.ResourceProperties);

  const { service } = await ecs
    .updateService({
      service: serviceName,
      cluster,
      desiredCount,
      deploymentConfiguration,
      healthCheckGracePeriodSeconds,
    })
    .promise();

  if (!service) throw Error('Service could not be updated');

  return {
    PhysicalResourceId: service.serviceArn as string,
    Data: {
      ServiceName: service.serviceName as string,
    },
  };
};

const onDelete = async (event: CloudFormationCustomResourceDeleteEvent): Promise<void> => {
  const { cluster, serviceName } = getProperties(event.ResourceProperties);

  await ecs
    .deleteService({
      service: serviceName,
      cluster,
      force: true,
    })
    .promise();

  await ecs
    .waitFor('servicesInactive', {
      cluster,
      services: [serviceName],
    })
    .promise();
};

export const handler = async (event: CloudFormationCustomResourceEvent): Promise<HandlerReturn | void> => {
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
