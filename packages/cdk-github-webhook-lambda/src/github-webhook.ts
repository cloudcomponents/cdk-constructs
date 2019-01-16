import { CloudFormationCustomResourceEvent } from 'aws-lambda';

import {
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler
} from '@cloudcomponents/custom-resource-helper';

import { createWebhook, updateWebhook, deleteWebhook } from './webhook-api';

export const handler = customResourceHelper(() => ({
  onCreate: handleCreate,
  onUpdate: handleUpdate,
  onDelete: handleDelete
}));

const handleCreate: OnCreateHandler = async (event, _) => {
  const { githubApiToken, githubRepoUrl, payloadUrl, events } = getProperties(
    event
  );
  const { data: responseData } = await createWebhook(
    githubApiToken,
    githubRepoUrl,
    payloadUrl,
    events
  );

  const physicalResourceId = responseData.id.toString();

  return {
    physicalResourceId,
    responseData
  };
};

const handleUpdate: OnUpdateHandler = async (event, _) => {
  const { githubApiToken, githubRepoUrl, payloadUrl, events } = getProperties(
    event
  );
  const hookId = event.PhysicalResourceId;

  const { data: responseData } = await updateWebhook(
    githubApiToken,
    githubRepoUrl,
    payloadUrl,
    events,
    parseInt(hookId)
  );

  const physicalResourceId = responseData.id.toString();

  return {
    physicalResourceId,
    responseData
  };
};

const handleDelete: OnDeleteHandler = async (event, _) => {
  const { githubApiToken, githubRepoUrl } = getProperties(event);
  const hookId = event.PhysicalResourceId;

  await deleteWebhook(githubApiToken, githubRepoUrl, parseInt(hookId));

  return;
};

const getProperties = (event: CloudFormationCustomResourceEvent) => {
  const props = event.ResourceProperties;

  const githubApiToken = props.GithubApiToken;
  const githubRepoUrl = props.GithubRepoUrl;
  const payloadUrl = props.PayloadUrl;
  const events = props.Events;

  return {
    githubApiToken,
    githubRepoUrl,
    payloadUrl,
    events
  };
};
