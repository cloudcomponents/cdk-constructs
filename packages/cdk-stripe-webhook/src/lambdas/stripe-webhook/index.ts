import { SecretKey } from '@cloudcomponents/lambda-utils';
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

const secretKey = new SecretKey();
export interface WebhookProps {
  secretKeyString: string;
  url: string;
  description?: string;
  events: Stripe.WebhookEndpointCreateParams.EnabledEvent[];
}

const handleCreate: OnCreateHandler = async (event, _): Promise<ResourceHandlerReturn> => {
  const { secretKeyString, url, events, description } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const value = await secretKey.getValue(secretKeyString);

  const stripe = new Stripe(value, { apiVersion: '2020-08-27' });

  const data = await stripe.webhookEndpoints.create(
    {
      url,
      description,
      enabled_events: events,
    },
    {
      maxNetworkRetries: 5,
    },
  );

  const physicalResourceId = data.id;

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleUpdate: OnUpdateHandler = async (event, _): Promise<ResourceHandlerReturn> => {
  const { secretKeyString, url, events, description } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(
    event.ResourceProperties,
  );

  const value = await secretKey.getValue(secretKeyString);

  const webhookId = event.PhysicalResourceId;

  const stripe = new Stripe(value, { apiVersion: '2020-08-27' });

  const data = await stripe.webhookEndpoints.update(
    webhookId,
    {
      url,
      description,
      enabled_events: events,
    },
    {
      maxNetworkRetries: 5,
    },
  );

  const physicalResourceId = data.id;

  return {
    physicalResourceId,
    responseData: {
      ...data,
    },
  };
};

const handleDelete: OnDeleteHandler = async (event, _): Promise<void> => {
  const { secretKeyString } = camelizeKeys<WebhookProps, CloudFormationCustomResourceEventCommon['ResourceProperties']>(event.ResourceProperties);

  const value = await secretKey.getValue(secretKeyString);

  const webhookId = event.PhysicalResourceId;

  const stripe = new Stripe(value, { apiVersion: '2020-08-27' });

  await stripe.webhookEndpoints.del(webhookId, undefined, {
    maxNetworkRetries: 5,
  });
};

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
