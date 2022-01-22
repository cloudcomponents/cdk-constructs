import * as path from 'path';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { Arn, Stack, aws_iam, aws_lambda, aws_apigateway, aws_events } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface StripeEventBusProducerProps {
  readonly secretKey: SecretKey;
  readonly endpointSecret: SecretKey;
  readonly source?: string;
  readonly eventBus?: aws_events.IEventBus;
  readonly throttlingBurstLimit?: number;
  readonly throttlingRateLimit?: number;
}

export class StripeEventBusProducer extends Construct {
  public readonly url: string;

  constructor(scope: Construct, id: string, props: StripeEventBusProducerProps) {
    super(scope, id);

    const handler = new aws_lambda.Function(this, 'Function', {
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'stripe-event-bus-producer')),
      handler: 'index.handler',
    });

    handler.addEnvironment('SOURCE', props.source ?? 'Stripe');

    if (props.eventBus) {
      handler.addEnvironment('EVENT_BUS_NAME', props.eventBus.eventBusArn);
      handler.addToRolePolicy(
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: ['events:PutEvents'],
          resources: [props.eventBus.eventBusArn],
        }),
      );
    } else {
      handler.addToRolePolicy(
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
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

    const api = new aws_apigateway.RestApi(this, 'Endpoint', {
      description: 'Stripe event bridge producer webhook',
      deployOptions: {
        throttlingBurstLimit: props.throttlingBurstLimit,
        throttlingRateLimit: props.throttlingRateLimit,
      },
    });

    api.root.addMethod('POST', new aws_apigateway.LambdaIntegration(handler));

    this.url = api.url;
  }
}
