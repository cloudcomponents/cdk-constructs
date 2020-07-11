import * as path from 'path';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';

export interface GithubWebhookProps {
  /**
   * The OAuth access token
   */
  readonly githubApiToken: string;

  /**
   * The Github repo url
   */
  readonly githubRepoUrl: string;

  /**
   * The URL to which the payloads will be delivered.
   */
  readonly payloadUrl: string;

  /**
   * Determines what events the hook is triggered for.
   * @see https://developer.github.com/v3/activity/events/types/
   */
  readonly events: string[];

  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class GithubWebhook extends Construct {
  constructor(scope: Construct, id: string, props: GithubWebhookProps) {
    super(scope, id);

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      uuid: '83CBF3EB-7B62-44F2-8C67-8441E4C1232E',
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'github-webhook')),
      handler: 'index.handler',
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
