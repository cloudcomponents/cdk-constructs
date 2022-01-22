import { SecretKey, SecretKeyStore } from '@cloudcomponents/cdk-secret-key';
import { StripeWebhook, StripeEventBusProducer } from '@cloudcomponents/cdk-stripe-webhook';
import { Stack, StackProps, aws_ssm } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StripeWebhookEventBusStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const secretKey = SecretKey.fromPlainText(process.env.SECRET_KEY as string);

    const endpointSecretParameter = aws_ssm.StringParameter.fromSecureStringParameterAttributes(this, 'Param', {
      parameterName: 'stripe',
      version: 1,
    });

    const producer = new StripeEventBusProducer(this, 'Producer', {
      secretKey,
      endpointSecret: SecretKey.fromSSMParameter(endpointSecretParameter),
    });

    const events = ['charge.failed', 'charge.succeeded'];

    const endpointSecretStore = SecretKeyStore.fromSSMParameter(endpointSecretParameter);

    new StripeWebhook(this, 'StripeWebhook', {
      secretKey,
      url: producer.url,
      events,
      logLevel: 'debug',
      endpointSecretStore,
    });
  }
}
