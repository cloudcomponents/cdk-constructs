import * as path from 'path';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';

export interface ContentfulWebhookProps {
  readonly accessToken: string | SecretKey;
  readonly spaceId: string;
  readonly name: string;
  readonly url: string;
  readonly topics: string[];
  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class ContentfulWebhook extends Construct {
  public constructor(scope: Construct, id: string, props: ContentfulWebhookProps) {
    super(scope, id);

    const accessToken = typeof props.accessToken === 'string' ? SecretKey.fromPlainText(props.accessToken) : props.accessToken;

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      uuid: '91f2075f-b950-4743-a66b-ee0f6febf50d',
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'contentful-webhook')),
      handler: 'index.handler',
      lambdaPurpose: 'Custom::ContentfulWebhook',
      timeout: Duration.minutes(15),
    });

    if (accessToken.grantRead) {
      accessToken.grantRead(handler);
    }

    new CustomResource(this, 'CustomResource', {
      serviceToken: handler.functionArn,
      resourceType: 'Custom::ContentfulWebhook',
      pascalCaseProperties: true,
      properties: {
        accessTokenString: accessToken.serialize(),
        spaceId: props.spaceId,
        name: props.name,
        url: props.url,
        topics: props.topics,
        logLevel: props.logLevel,
      },
    });
  }
}
