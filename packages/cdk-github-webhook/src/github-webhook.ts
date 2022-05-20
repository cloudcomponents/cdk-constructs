import * as path from 'path';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';

export interface GithubWebhookProps {
  /**
   * The OAuth access token
   */
  readonly githubApiToken: string | SecretKey;

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
  /**
   * The webhook secret that GitHub uses to create a
   * hash signature with each payload
   * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks#validating-payloads-from-github
   */
  readonly webhookSecret?: string

  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class GithubWebhook extends Construct {
  constructor(scope: Construct, id: string, props: GithubWebhookProps) {
    super(scope, id);

    const githubApiToken = typeof props.githubApiToken === 'string' ? SecretKey.fromPlainText(props.githubApiToken) : props.githubApiToken;

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      uuid: '83CBF3EB-7B62-44F2-8C67-8441E4C1232E',
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'github-webhook')),
      handler: 'index.handler',
      lambdaPurpose: 'Custom::GithubWebhook',
      timeout: Duration.minutes(15),
    });

    if (githubApiToken.grantRead) {
      githubApiToken.grantRead(handler);
    }

    new CustomResource(this, 'CustomResource', {
      serviceToken: handler.functionArn,
      resourceType: 'Custom::GithubWebhook',
      pascalCaseProperties: true,
      properties: {
        githubApiTokenString: githubApiToken.serialize(),
        githubRepoUrl: props.githubRepoUrl,
        payloadUrl: props.payloadUrl,
        events: props.events,
        logLevel: props.logLevel,
        webhookSecret: props.webhookSecret
      },
    });
  }
}
