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
  description?: string;
  events: Stripe.WebhookEndpointCreateParams.EnabledEvent[];
}

const handleCreate: OnCreateHandler = async (event, _): Promise<ResourceHandlerReturn> => {
  const { secretKey, url, events, description } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const stripe = new Stripe(secretKey, { apiVersion: '2020-08-27' });

  const data = await stripe.webhookEndpoints.create({
    url,
    description,
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
  const { secretKey, url, events, description } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const webhookId = event.PhysicalResourceId;

  const stripe = new Stripe(secretKey, { apiVersion: '2020-08-27' });

  const data = await stripe.webhookEndpoints.update(webhookId, {
    url,
    description,
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

  const stripe = new Stripe(secretKey, { apiVersion: '2020-08-27' });

  await stripe.webhookEndpoints.del(webhookId);
};

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
