import { CloudFormationCustomResourceEvent } from 'aws-lambda';
import * as contentful from 'contentful-management';

import {
    customResourceHelper,
    OnCreateHandler,
    OnUpdateHandler,
    OnDeleteHandler,
    ResourceHandler,
    ResourceHandlerReturn,
} from 'custom-resource-helper';

export interface WebhookProps {
    accessToken: string;
    spaceId: string;
    name: string;
    url: string;
    topics: string[];
}

const getProperties = (
    event: CloudFormationCustomResourceEvent,
): WebhookProps => {
    const props = event.ResourceProperties;

    const accessToken = props.AccessToken;
    const spaceId = props.SpaceId;
    const url = props.Url;
    const name = props.Name;
    const topics = props.Topics;

    return {
        accessToken,
        spaceId,
        url,
        name,
        topics,
    };
};

const getSpace = async (accessToken: string, spaceId: string) => {
    const client = contentful.createClient({
        accessToken,
    });

    return client.getSpace(spaceId);
};

const handleCreate: OnCreateHandler = async (
    event,
    _,
): Promise<ResourceHandlerReturn> => {
    const { accessToken, spaceId, ...props } = getProperties(event);

    const space = await getSpace(accessToken, spaceId);

    const responseData = await space.createWebhook({
        ...props,
    });

    const physicalResourceId = responseData.sys.id;

    return {
        physicalResourceId,
        responseData,
    };
};

const handleUpdate: OnUpdateHandler = async (
    event,
    _,
): Promise<ResourceHandlerReturn> => {
    const { accessToken, spaceId, ...props } = getProperties(event);

    const webhookId = event.PhysicalResourceId;

    const space = await getSpace(accessToken, spaceId);

    let webhook = await space.getWebhook(webhookId);

    webhook = {
        ...webhook,
        ...props,
    };

    const responseData = await webhook.update();

    const physicalResourceId = responseData.sys.id;

    return {
        physicalResourceId,
        responseData,
    };
};

const handleDelete: OnDeleteHandler = async (event, _): Promise<void> => {
    const { accessToken, spaceId } = getProperties(event);

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
