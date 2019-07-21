import { CloudFormationCustomResourceEvent } from 'aws-lambda'; // eslint-disable-line import/no-unresolved

import {
    customResourceHelper,
    OnCreateHandler,
    OnUpdateHandler,
    OnDeleteHandler,
    ResourceHandler,
    ResourceHandlerReturn,
} from '@cloudcomponents/custom-resource-helper';

import { createWebhook, updateWebhook, deleteWebhook } from './webhook-api';

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
        events,
    };
};

const handleCreate: OnCreateHandler = async (
    event,
    _,
): Promise<ResourceHandlerReturn> => {
    const { githubApiToken, githubRepoUrl, payloadUrl, events } = getProperties(
        event,
    );
    const { data: responseData } = await createWebhook(
        githubApiToken,
        githubRepoUrl,
        payloadUrl,
        events,
    );

    const physicalResourceId = responseData.id.toString();

    return {
        physicalResourceId,
        responseData,
    };
};

const handleUpdate: OnUpdateHandler = async (
    event,
    _,
): Promise<ResourceHandlerReturn> => {
    const { githubApiToken, githubRepoUrl, payloadUrl, events } = getProperties(
        event,
    );
    const hookId = event.PhysicalResourceId;

    const { data: responseData } = await updateWebhook(
        githubApiToken,
        githubRepoUrl,
        payloadUrl,
        events,
        parseInt(hookId, 10),
    );

    const physicalResourceId = responseData.id.toString();

    return {
        physicalResourceId,
        responseData,
    };
};

const handleDelete: OnDeleteHandler = async (event, _): Promise<void> => {
    const { githubApiToken, githubRepoUrl } = getProperties(event);
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
