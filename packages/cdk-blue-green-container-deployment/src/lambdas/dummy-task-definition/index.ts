import type { CloudFormationCustomResourceEvent, CloudFormationCustomResourceCreateEvent, CloudFormationCustomResourceDeleteEvent } from 'aws-lambda';
import { ECS } from 'aws-sdk';

interface HandlerReturn {
  PhysicalResourceId: string;
}

export interface EcsTaskDefinitionProps {
  family: string;
  image: string;
  executionRoleArn: string;
  networkMode: string;
  containerName: string;
  containerPort: number;
}

const ecs = new ECS();

const getProperties = (props: CloudFormationCustomResourceEvent['ResourceProperties']): EcsTaskDefinitionProps => ({
  family: props.Family,
  image: props.Image,
  executionRoleArn: props.ExecutionRoleArn,
  networkMode: props.NetworkMode,
  containerName: props.ContainerName,
  containerPort: props.ContainerPort,
});

const onCreate = async (event: CloudFormationCustomResourceCreateEvent): Promise<HandlerReturn> => {
  const { family, image, executionRoleArn, networkMode, containerName, containerPort } = getProperties(event.ResourceProperties);

  const { taskDefinition } = await ecs
    .registerTaskDefinition({
      requiresCompatibilities: ['FARGATE'],
      family,
      executionRoleArn,
      networkMode,
      cpu: '256',
      memory: '512',
      containerDefinitions: [
        {
          name: containerName,
          image,
          portMappings: [
            {
              hostPort: containerPort,
              protocol: 'tcp',
              containerPort: containerPort,
            },
          ],
        },
      ],
    })
    .promise();

  if (!taskDefinition) throw Error('Taskdefinition could not be registerd');

  return {
    PhysicalResourceId: taskDefinition.taskDefinitionArn as string,
  };
};

const onDelete = async (event: CloudFormationCustomResourceDeleteEvent): Promise<void> => {
  const taskDefinition = event.PhysicalResourceId;

  await ecs
    .deregisterTaskDefinition({
      taskDefinition,
    })
    .promise();
};

export const handler = async (event: CloudFormationCustomResourceEvent): Promise<HandlerReturn | void> => {
  const requestType = event.RequestType;

  switch (requestType) {
    case 'Create':
      return onCreate(event as CloudFormationCustomResourceCreateEvent);
    case 'Update':
      // CodeDeploy is responsible for updates on the TaskDefinition
      return;
    case 'Delete':
      return onDelete(event as CloudFormationCustomResourceDeleteEvent);
    default:
      throw new Error(`Invalid request type: ${requestType}`);
  }
};
