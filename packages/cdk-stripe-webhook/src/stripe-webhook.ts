import * as path from 'path';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Construct, Duration, CustomResource } from '@aws-cdk/core';
import { SecretKey, SecretKeyStore } from '@cloudcomponents/cdk-secret-key';
export interface StripeWebhookProps {
  readonly secretKey: SecretKey | string;
  readonly url: string;
  readonly description?: string;
  readonly events: string[];
  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
  readonly endpointSecretStore?: SecretKeyStore;
}

export class StripeWebhook extends Construct {
  public readonly id: string;

  constructor(scope: Construct, id: string, props: StripeWebhookProps) {
    super(scope, id);

    const secretKey = typeof props.secretKey === 'string' ? SecretKey.fromPlainText(props.secretKey) : props.secretKey;

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      uuid: 'e9db3870-d793-4cd2-96a9-efe2e318ebbc',
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'stripe-webhook')),
      handler: 'index.handler',
      lambdaPurpose: 'Custom::StripeWebhook',
      timeout: Duration.minutes(15),
    });

    if (secretKey.grantRead) {
      secretKey.grantRead(handler);
    }

    if (props.endpointSecretStore) {
      props.endpointSecretStore.grantWrite(handler);
    }

    const cr = new CustomResource(this, 'CustomResource', {
      serviceToken: handler.functionArn,
      resourceType: 'Custom::StripeWebhook',
      pascalCaseProperties: true,
      properties: {
        url: props.url,
        description: props.description,
        events: props.events,
        logLevel: props.logLevel,
        secretKeyString: secretKey.serialize(),
        endpointSecretStoreString: props.endpointSecretStore?.serialize(),
      },
    });

    this.id = cr.ref;
  }
}
