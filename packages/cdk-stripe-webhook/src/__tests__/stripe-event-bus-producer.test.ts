import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { StripeEventBusProducer } from '../stripe-event-bus-producer';

test('default setup - secretKey', (): void => {
  const stack = new Stack();

  const secretKey = SecretKey.fromPlainText('sk_test_1213fdsdfsgfsdgdfgfdg');
  const endpointSecret = SecretKey.fromPlainText('endpointSecretxyz');

  new StripeEventBusProducer(stack, 'StripeEventBusProducer', {
    secretKey,
    endpointSecret,
  });

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Resources: {
        StripeEventBusProducerFunctionC5CBF385: {
          Properties: {
            Code: expect.any(Object),
          },
        },
      },
    },
  });
});
