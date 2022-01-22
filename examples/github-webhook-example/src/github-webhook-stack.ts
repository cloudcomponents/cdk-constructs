import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { Stack, StackProps, aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class GithubWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new aws_apigateway.RestApi(this, 'github-webhook');
    api.root.addMethod('POST');

    const githubApiToken = SecretKey.fromPlainText(process.env.API_TOKEN as string);

    // @example https://github.com/cloudcomponents/cdk-constructs
    const githubRepoUrl = process.env.REPO_URL as string;

    // @see https://developer.github.com/v3/activity/events/types/
    const events = ['*'];

    new GithubWebhook(this, 'GithubWebhook', {
      githubApiToken,
      githubRepoUrl,
      payloadUrl: api.url,
      events,
      logLevel: 'debug',
    });
  }
}
