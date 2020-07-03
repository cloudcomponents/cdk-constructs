import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { StripeWebhook } from '../stripe-webhook';

describe('cdk-stripe-webhook', (): void => {
  test('snapshot', (): void => {
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
});
