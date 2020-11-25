import * as path from 'path';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';

export interface StripeWebhookProps {
  readonly secretKey: string;
  readonly url: string;
  readonly description?: string;
  readonly events: string[];
  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class StripeWebhook extends Construct {
  public readonly id: string;

  constructor(scope: Construct, id: string, props: StripeWebhookProps) {
    super(scope, id);

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      uuid: 'e9db3870-d793-4cd2-96a9-efe2e318ebbc',
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'stripe-webhook')),
      handler: 'index.handler',
      lambdaPurpose: 'Custom::StripeWebhook',
      timeout: Duration.minutes(15),
    });

    const cr = new CustomResource(this, 'CustomResource', {
      serviceToken: handler.functionArn,
      resourceType: 'Custom::StripeWebhook',
      pascalCaseProperties: true,
      properties: {
        ...props,
      },
    });

    this.id = cr.ref;
  }
}
