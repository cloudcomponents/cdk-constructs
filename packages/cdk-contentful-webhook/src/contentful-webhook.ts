import * as path from 'path';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';

export interface ContentfulWebhookProps {
  readonly accessToken: string;
  readonly spaceId: string;
  readonly name: string;
  readonly url: string;
  readonly topics: string[];
  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
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
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(
        path.join(__dirname, 'lambdas', 'contentful-webhook'),
      ),
      handler: 'index.handler',
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
