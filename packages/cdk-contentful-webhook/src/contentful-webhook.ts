import * as path from 'path';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';

export interface ContentfulWebhookProps {
    accessToken: string;
    spaceId: string;
    name: string;
    url: string;
    topics: string[];
    logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class ContentfulWebhook extends Construct {
    public constructor(
        scope: Construct,
        id: string,
        props: ContentfulWebhookProps,
    ) {
        super(scope, id);

        const handler = new SingletonFunction(this, 'CustomResourceHandler', {
            uuid: '91f2075f-b950-4743-a66b-ee0f6febf50d',
            runtime: Runtime.NODEJS_10_X,
            code: Code.fromAsset(
                path.join(__dirname, '..', 'lambda', 'bundle.zip'),
            ),
            handler: 'lib/contentful-webhook.handler',
            lambdaPurpose: 'Custom::ContentfulWebhook',
            timeout: Duration.minutes(15),
        });

        new CustomResource(this, 'CustomResource', {
            serviceToken: handler.functionArn,
            resourceType: 'Custom::ContentfulWebhook',
            pascalCaseProperties: true,
            properties: {
                ...props,
            },
        });
    }
}
