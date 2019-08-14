import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { StripeWebhook } from '../stripe-webhook';

describe('cdk-stripe-webhook', (): void => {
    it('snapshot', (): void => {
        const stack = new Stack();

        new StripeWebhook(stack, 'StripeWebhook', {
            secretKey: 'sk_test_1213fdsdfsgfsdgdfgfdg',
            url: 'https://www.example.com/test',
            events: ['charge.failed', 'charge.succeeded'],
        });

        expect(stack).toMatchCdkSnapshot();
    });
});
