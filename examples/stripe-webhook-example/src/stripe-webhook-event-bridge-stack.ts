import { StringParameter } from '@aws-cdk/aws-ssm';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { SecretKey, SecretKeyStore } from '@cloudcomponents/cdk-secret-key';
import { StripeWebhook, StripeEventBridgeProducer } from '@cloudcomponents/cdk-stripe-webhook';
export class StripeWebhookEventBridgeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const endpointSecretParameter = StringParameter.fromSecureStringParameterAttributes(this, 'Param', {
      parameterName: 'stripe',
      version: 1,
    });

    const producer = new StripeEventBridgeProducer(this, 'Producer', {
      endpointSecret: SecretKey.fromSSMParameter(endpointSecretParameter),
    });

    const secretKey = SecretKey.fromPlainText(process.env.SECRET_KEY as string);

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
