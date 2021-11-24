import type { CloudFormationCustomResourceEvent } from 'aws-lambda';
import { ECS } from 'aws-sdk';
import {
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler,
  ResourceHandler,
  ResourceHandlerReturn,
} from 'custom-resource-helper';

export interface Tag {
  Key: string;
  Value: string;
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
  propagateTags: 'SERVICE' | 'TASK_DEFINITION' | string;
  tags: Tag[];
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
  propagateTags: props.PropagateTags,
  tags: props.Tags ?? [],
});

export const handleCreate: OnCreateHandler = async (event): Promise<ResourceHandlerReturn> => {
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
    propagateTags,
    tags,
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
      propagateTags,
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
          targetGroupArn,
          containerPort,
          containerName,
        },
      ],
      tags: tags.map((t) => {
        return { key: t.Key, value: t.Value };
      }),
    })
    .promise();

  if (!service) throw Error('Service could not be created');

  return {
    physicalResourceId: service.serviceArn as string,
    responseData: {
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
export const handleUpdate: OnUpdateHandler = async (event): Promise<ResourceHandlerReturn> => {
  const { cluster, serviceName, desiredCount, deploymentConfiguration, healthCheckGracePeriodSeconds, tags } = getProperties(
    event.ResourceProperties,
  );

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

  const newTagKeys: string[] = tags.map((t: Tag) => t.Key);
  const removableTagKeys: string[] = (event.OldResourceProperties.Tags || [])
    .map((t: any) => t.Key)
    .filter((t: string) => !newTagKeys.includes(t));

  if (removableTagKeys.length > 0) {
    await ecs
      .untagResource({
        resourceArn: service.serviceArn as string,
        tagKeys: removableTagKeys,
      })
      .promise();
  }

  if (tags.length > 0) {
    await ecs
      .tagResource({
        resourceArn: service.serviceArn as string,
        tags: tags.map((t) => {
          return { key: t.Key, value: t.Value };
        }),
      })
      .promise();
  }

  return {
    physicalResourceId: service.serviceArn as string,
    responseData: {
      ServiceName: service.serviceName as string,
    },
  };
};

const handleDelete: OnDeleteHandler = async (event): Promise<void> => {
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

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
