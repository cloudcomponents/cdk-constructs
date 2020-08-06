import type { CloudFormationCustomResourceEventCommon } from 'aws-lambda';
import {
  camelizeKeys,
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler,
  ResourceHandler,
  ResourceHandlerReturn,
} from 'custom-resource-helper';
import Stripe from 'stripe';

export interface WebhookProps {
  secretKey: string;
  url: string;
  events: Stripe.events.EventType[];
}

const handleCreate: OnCreateHandler = async (event, _): Promise<ResourceHandlerReturn> => {
  const { secretKey, url, events } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const stripe = new Stripe(secretKey);

  const data = await stripe.webhookEndpoints.create({
    url,
    enabled_events: events,
  });

  const physicalResourceId = data.id;

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleUpdate: OnUpdateHandler = async (event, _): Promise<ResourceHandlerReturn> => {
  const { secretKey, url, events } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const webhookId = event.PhysicalResourceId;

  const stripe = new Stripe(secretKey);

  const data = await stripe.webhookEndpoints.update(webhookId, {
    url,
    enabled_events: events,
  });

  const physicalResourceId = data.id;

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleDelete: OnDeleteHandler = async (event, _): Promise<void> => {
  const { secretKey } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(event.ResourceProperties);

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
