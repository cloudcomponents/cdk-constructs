import type { CloudFormationCustomResourceEventCommon } from 'aws-lambda';
import {
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler,
  ResourceHandler,
  ResourceHandlerReturn,
  camelizeKeys,
} from 'custom-resource-helper';

import { createWebhook, updateWebhook, deleteWebhook } from './webhook-api';

export interface WebhookProps {
  githubApiToken: string;
  githubRepoUrl: string;
  payloadUrl: string;
  events: string[];
}

const handleCreate: OnCreateHandler = async (event): Promise<ResourceHandlerReturn> => {
  const { githubApiToken, githubRepoUrl, payloadUrl, events } = camelizeKeys<
    WebhookProps,
    CloudFormationCustomResourceEventCommon['ResourceProperties']
  >(event.ResourceProperties);

  const { data } = await createWebhook(githubApiToken, githubRepoUrl, payloadUrl, events);

  const physicalResourceId = data.id.toString();

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleUpdate: OnUpdateHandler = async (event): Promise<ResourceHandlerReturn> => {
  const { githubApiToken, githubRepoUrl, payloadUrl, events } = camelizeKeys<
    WebhookProps,
    CloudFormationCustomResourceEventCommon['ResourceProperties']
  >(event.ResourceProperties);

  const hookId = event.PhysicalResourceId;

  const { data } = await updateWebhook(githubApiToken, githubRepoUrl, payloadUrl, events, parseInt(hookId, 10));

  const physicalResourceId = data.id.toString();

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleDelete: OnDeleteHandler = async (event): Promise<void> => {
  const { githubApiToken, githubRepoUrl } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const hookId = event.PhysicalResourceId;

  await deleteWebhook(githubApiToken, githubRepoUrl, parseInt(hookId, 10));
};

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
