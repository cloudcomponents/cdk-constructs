import * as path from 'path';
import { CustomResource } from '@aws-cdk/aws-cloudformation';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/cdk';

export interface GithubWebhookProps {
  githubApiToken: string;
  githubRepoUrl: string;
  payloadUrl: string;
  events: string[]; //@see https://developer.github.com/v3/activity/events/types/
  logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class GithubWebhook extends Construct {
  constructor(parent: Construct, id: string, props: GithubWebhookProps) {
    super(parent, id);

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      uuid: '83CBF3EB-7B62-44F2-8C67-8441E4C1232E',
      runtime: Runtime.NodeJS810,
      code: Code.asset(path.join(__dirname, '..', 'lambda', 'bundle.zip')),
      handler: 'lib/github-webhook.handler',
      lambdaPurpose: 'Custom::GithubWebhook',
      timeout: 15 * 60
    });

    const {
      githubApiToken,
      githubRepoUrl,
      payloadUrl,
      events,
      logLevel
    } = props;

    new CustomResource(this, 'CustomResource', {
      lambdaProvider: handler,
      resourceType: 'Custom::GithubWebhook',
      properties: {
        GithubApiToken: githubApiToken,
        GithubRepoUrl: githubRepoUrl,
        PayloadUrl: payloadUrl,
        Events: events,
        LogLevel: logLevel
      }
    });
  }
}
