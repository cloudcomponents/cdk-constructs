import * as path from 'path';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';

export interface GithubWebhookProps {
    githubApiToken: string;
    githubRepoUrl: string;
    payloadUrl: string;
    events: string[]; // @see https://developer.github.com/v3/activity/events/types/
    logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class GithubWebhook extends Construct {
    public constructor(
        parent: Construct,
        id: string,
        props: GithubWebhookProps,
    ) {
        super(parent, id);

        const handler = new SingletonFunction(this, 'CustomResourceHandler', {
            uuid: '83CBF3EB-7B62-44F2-8C67-8441E4C1232E',
            runtime: Runtime.NODEJS_10_X,
            code: Code.fromAsset(
                path.join(__dirname, '..', 'lambda', 'bundle.zip'),
            ),
            handler: 'lib/github-webhook.handler',
            lambdaPurpose: 'Custom::GithubWebhook',
            timeout: Duration.minutes(15),
        });

        const {
            githubApiToken,
            githubRepoUrl,
            payloadUrl,
            events,
            logLevel,
        } = props;

        new CustomResource(this, 'CustomResource', {
            serviceToken: handler.functionArn,
            resourceType: 'Custom::GithubWebhook',
            properties: {
                GithubApiToken: githubApiToken,
                GithubRepoUrl: githubRepoUrl,
                PayloadUrl: payloadUrl,
                Events: events,
                LogLevel: logLevel,
            },
        });
    }
}
