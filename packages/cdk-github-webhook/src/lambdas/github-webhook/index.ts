import { SecretKey } from '@cloudcomponents/lambda-utils';
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
  githubApiTokenString: string;
  githubRepoUrl: string;
  payloadUrl: string;
  events: string[];
  webhookSecret?: string;
}

const handleCreate: OnCreateHandler = async (event): Promise<ResourceHandlerReturn> => {
  const { githubApiTokenString, githubRepoUrl, payloadUrl, events, webhookSecret } = camelizeKeys<
    WebhookProps,
    CloudFormationCustomResourceEventCommon['ResourceProperties']
  >(event.ResourceProperties);

  const secretKey = new SecretKey(githubApiTokenString);
  const githubApiToken = await secretKey.getValue();

  const { data } = await createWebhook(githubApiToken, githubRepoUrl, payloadUrl, events, webhookSecret);

  const physicalResourceId = data.id.toString();

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleUpdate: OnUpdateHandler = async (event): Promise<ResourceHandlerReturn> => {
  const { githubApiTokenString, githubRepoUrl, payloadUrl, events, webhookSecret } = camelizeKeys<
    WebhookProps,
    CloudFormationCustomResourceEventCommon['ResourceProperties']
  >(event.ResourceProperties);

  const secretKey = new SecretKey(githubApiTokenString);
  const githubApiToken = await secretKey.getValue();

  const hookId = event.PhysicalResourceId;

  const { data } = await updateWebhook(githubApiToken, githubRepoUrl, payloadUrl, events, parseInt(hookId, 10), webhookSecret);

  const physicalResourceId = data.id.toString();

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleDelete: OnDeleteHandler = async (event): Promise<void> => {
  const { githubApiTokenString, githubRepoUrl } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const secretKey = new SecretKey(githubApiTokenString);
  const githubApiToken = await secretKey.getValue();

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
