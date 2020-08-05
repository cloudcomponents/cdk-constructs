import type { CloudFormationCustomResourceEventCommon } from 'aws-lambda';
import * as contentful from 'contentful-management';

import {
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler,
  ResourceHandler,
  ResourceHandlerReturn,
  camelizeKeys,
} from 'custom-resource-helper';

export interface WebhookProps {
  accessToken: string;
  spaceId: string;
  name: string;
  url: string;
  topics: string[];
}

const getSpace = async (accessToken: string, spaceId: string) => {
  const client = contentful.createClient({
    accessToken,
  });

  return client.getSpace(spaceId);
};

const handleCreate: OnCreateHandler = async (event): Promise<ResourceHandlerReturn> => {
  const { accessToken, spaceId, ...props } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const space = await getSpace(accessToken, spaceId);

  const res = await space.createWebhook({
    ...props,
    headers: [], // TODO
  });

  const physicalResourceId = res.sys.id;

  return {
    physicalResourceId,
  };
};

const handleUpdate: OnUpdateHandler = async (event): Promise<ResourceHandlerReturn> => {
  const { accessToken, spaceId, ...props } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const webhookId = event.PhysicalResourceId;

  const space = await getSpace(accessToken, spaceId);

  let webhook = await space.getWebhook(webhookId);

  webhook = {
    ...webhook,
    ...props,
  };

  const res = await webhook.update();

  const physicalResourceId = res.sys.id;

  return {
    physicalResourceId,
  };
};

const handleDelete: OnDeleteHandler = async (event): Promise<void> => {
  const { accessToken, spaceId } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const webhookId = event.PhysicalResourceId;

  const space = await getSpace(accessToken, spaceId);

  const webhook = await space.getWebhook(webhookId);

  await webhook.delete();
};

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
