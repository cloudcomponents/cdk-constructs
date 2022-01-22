import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { StripeWebhook } from '@cloudcomponents/cdk-stripe-webhook';
import { Stack, StackProps, aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export class StripeWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new aws_apigateway.RestApi(this, 'Endpoint');
    api.root.addMethod('POST');

    const secretKey = SecretKey.fromPlainText(process.env.SECRET_KEY as string);

    const events = ['charge.failed', 'charge.succeeded'];

    new StripeWebhook(this, 'StripeWebhook', {
      secretKey,
      url: api.url,
      events,
      logLevel: 'debug',
    });
  }
}
