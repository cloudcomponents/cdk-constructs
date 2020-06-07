import * as path from 'path';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';

export interface StripeWebhookProps {
  secretKey: string;
  url: string;
  events: string[];
  logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class StripeWebhook extends Construct {
  public constructor(scope: Construct, id: string, props: StripeWebhookProps) {
    super(scope, id);

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      uuid: 'e9db3870-d793-4cd2-96a9-efe2e318ebbc',
      runtime: Runtime.NODEJS_10_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'stripe-webhook')),
      handler: 'index.handler',
      lambdaPurpose: 'Custom::StripeWebhook',
      timeout: Duration.minutes(15),
    });

    new CustomResource(this, 'CustomResource', {
      serviceToken: handler.functionArn,
      resourceType: 'Custom::StripeWebhook',
      pascalCaseProperties: true,
      properties: {
        ...props,
      },
    });
  }
}
