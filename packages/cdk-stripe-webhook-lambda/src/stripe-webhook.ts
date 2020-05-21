import * as Stripe from 'stripe';

import {
  camelizeKeys,
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler,
  ResourceHandler,
  ResourceHandlerReturn,
} from 'custom-resource-helper';

export interface WebhookProps {
  secretKey: string;
  url: string;
  events: string[];
}

const handleCreate: OnCreateHandler = async (
  event,
  _,
): Promise<ResourceHandlerReturn> => {
  const { secretKey, url, events } = camelizeKeys(event.ResourceProperties);

  const stripe = new Stripe(secretKey);

  const responseData = await stripe.webhookEndpoints.create({
    url,
    enabled_events: events,
  });

  const physicalResourceId = responseData.id;

  return {
    physicalResourceId,
    responseData,
  };
};

const handleUpdate: OnUpdateHandler = async (
  event,
  _,
): Promise<ResourceHandlerReturn> => {
  const { secretKey, url, events } = camelizeKeys(event.ResourceProperties);

  const webhookId = event.PhysicalResourceId;

  const stripe = new Stripe(secretKey);

  const responseData = await stripe.webhookEndpoints.update(webhookId, {
    url,
    enabled_events: events,
  });

  const physicalResourceId = responseData.id;

  return {
    physicalResourceId,
    responseData,
  };
};

const handleDelete: OnDeleteHandler = async (event, _): Promise<void> => {
  const { secretKey } = camelizeKeys(event.ResourceProperties);

  const webhookId = event.PhysicalResourceId;

  const stripe = new Stripe(secretKey);

  await stripe.webhookEndpoints.del(webhookId);
};

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
