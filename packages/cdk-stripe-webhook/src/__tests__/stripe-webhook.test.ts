import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { StripeWebhook } from '../stripe-webhook';

test('default setup', (): void => {
  const stack = new Stack();

  new StripeWebhook(stack, 'StripeWebhook', {
    secretKey: 'sk_test_1213fdsdfsgfsdgdfgfdg',
    url: 'https://www.example.com/test',
    events: ['charge.failed', 'charge.succeeded'],
  });

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Parameters: expect.any(Object),
      Resources: {
        CustomStripeWebhooke9db3870d7934cd296a9efe2e318ebbc3F433A9D: {
          Properties: {
            Code: expect.any(Object),
          },
        },
      },
    },
  });
});

test('default setup - secretKey', (): void => {
  const stack = new Stack();

  const secretKey = SecretKey.fromPlainText('sk_test_1213fdsdfsgfsdgdfgfdg');

  new StripeWebhook(stack, 'StripeWebhook', {
    secretKey,
    url: 'https://www.example.com/test',
    events: ['charge.failed', 'charge.succeeded'],
  });

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Parameters: expect.any(Object),
      Resources: {
        CustomStripeWebhooke9db3870d7934cd296a9efe2e318ebbc3F433A9D: {
          Properties: {
            Code: expect.any(Object),
          },
        },
      },
    },
  });
});
