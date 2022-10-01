import { RestApi } from '@aws-cdk/aws-apigateway';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';

export class GithubWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'github-webhook');
    api.root.addMethod('POST');

    const githubApiToken = SecretKey.fromPlainText(process.env.API_TOKEN as string);

    // @example https://github.com/cloudcomponents/cdk-constructs
    const githubRepoUrl = process.env.REPO_URL as string;

    // @see https://developer.github.com/v3/activity/events/types/
    const events = ['*'];

    // @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks#validating-payloads-from-github
    const webhookSecret = process.env.SECURE_WEBHOOK === 'true' ? (process.env.WEBHOOK_SECRET || githubApiToken.serialize()) : undefined

    new GithubWebhook(this, 'GithubWebhook', {
      githubApiToken,
      githubRepoUrl,
      payloadUrl: api.url,
      events,
      logLevel: 'debug',
      webhookSecret
    });
  }
}
