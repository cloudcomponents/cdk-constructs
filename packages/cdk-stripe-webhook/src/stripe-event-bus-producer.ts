import * as path from 'path';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { IEventBus } from '@aws-cdk/aws-events';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Construct, Arn, Stack } from '@aws-cdk/core';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';

export interface StripeEventBusProducerProps {
  readonly secretKey: SecretKey;
  readonly endpointSecret: SecretKey;
  readonly source?: string;
  readonly eventBus?: IEventBus;
  readonly throttlingBurstLimit?: number;
  readonly throttlingRateLimit?: number;
}

export class StripeEventBusProducer extends Construct {
  public readonly url: string;

  constructor(scope: Construct, id: string, props: StripeEventBusProducerProps) {
    super(scope, id);

    const handler = new Function(this, 'Function', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'stripe-event-bus-producer')),
      handler: 'index.handler',
    });

    handler.addEnvironment('SOURCE', props.source ?? 'Stripe');

    if (props.eventBus) {
      handler.addEnvironment('EVENT_BUS_NAME', props.eventBus.eventBusArn);
      handler.addToRolePolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['events:PutEvents'],
          resources: [props.eventBus.eventBusArn],
        }),
      );
    } else {
      handler.addToRolePolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['events:PutEvents'],
          resources: [
            Arn.format(
              {
                resource: 'event-bus',
                service: 'events',
                resourceName: 'default',
              },
              Stack.of(this),
            ),
          ],
        }),
      );
    }

    if (props.endpointSecret.grantRead) {
      props.endpointSecret.grantRead(handler);
    }
    handler.addEnvironment('ENDPOINT_SECRET_STRING', props.endpointSecret.serialize());

    if (props.secretKey.grantRead) {
      props.secretKey.grantRead(handler);
    }
    handler.addEnvironment('SECRET_KEY_STRING', props.secretKey.serialize());

    const api = new RestApi(this, 'Endpoint', {
      description: 'Stripe event bridge producer webhook',
      deployOptions: {
        throttlingBurstLimit: props.throttlingBurstLimit,
        throttlingRateLimit: props.throttlingRateLimit,
      },
    });

    api.root.addMethod('POST', new LambdaIntegration(handler));

    this.url = api.url;
  }
}
