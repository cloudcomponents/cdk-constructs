import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { Stack, StackProps, aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class GithubWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new aws_apigateway.RestApi(this, 'github-webhook');
    api.root.addMethod('POST');

    if (typeof process.env.API_TOKEN === 'undefined') {
      throw new Error('environment variable API_TOKEN undefined');
    }
    const githubApiToken = SecretKey.fromPlainText(process.env.API_TOKEN);

    // @example https://github.com/cloudcomponents/cdk-constructs
    if (typeof process.env.REPO_URL === 'undefined') {
      throw new Error('environment variable REPO_URL undefined');
    }
    const githubRepoUrl = process.env.REPO_URL;

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
