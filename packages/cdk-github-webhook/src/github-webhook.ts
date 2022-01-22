import * as path from 'path';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { CustomResource, Duration, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

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

  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class GithubWebhook extends Construct {
  constructor(scope: Construct, id: string, props: GithubWebhookProps) {
    super(scope, id);

    const githubApiToken = typeof props.githubApiToken === 'string' ? SecretKey.fromPlainText(props.githubApiToken) : props.githubApiToken;

    const handler = new aws_lambda.SingletonFunction(this, 'CustomResourceHandler', {
      uuid: '83CBF3EB-7B62-44F2-8C67-8441E4C1232E',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'github-webhook')),
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
      },
    });
  }
}
