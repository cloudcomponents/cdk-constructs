import { RestApi } from '@aws-cdk/aws-apigateway';
// import { Secret } from '@aws-cdk/aws-secretsmanager';
// import { StringParameter } from '@aws-cdk/aws-ssm';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import {
  SecretKey,
  //SecretKeyStore,
} from '@cloudcomponents/cdk-secret-key';
import { StripeWebhook } from '@cloudcomponents/cdk-stripe-webhook';
export class StripeWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'Endpoint');
    api.root.addMethod('POST');

    // const secret = Secret.fromSecretNameV2(this, 'Secret', 'stripe');
    // const secretKey = SecretKey.fromSecretsManager(secret);

    // const ssmParameter = StringParameter.fromSecureStringParameterAttributes(this, 'Param', {
    //   parameterName: 'stripe',
    //   version: 1,
    // });
    // const secretKey = SecretKey.fromSSMParameter(ssmParameter);

    const secretKey = SecretKey.fromPlainText(process.env.SECRET_KEY as string);

    const events = ['charge.failed', 'charge.succeeded'];

    // const ssmParameter = StringParameter.fromSecureStringParameterAttributes(this, 'Param', {
    //   parameterName: 'stripe',
    //   version: 1,
    // });
    // const endpointSecretStore = SecretKeyStore.fromSSMParameter(ssmParameter);

    new StripeWebhook(this, 'StripeWebhook', {
      secretKey,
      url: api.url,
      events,
      logLevel: 'debug',
      //endpointSecretStore,
    });
  }
}
