import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { ContentfulWebhook } from '../contentful-webhook';

describe('cdk-contentful-webhook', (): void => {
    it('snapshot', (): void => {
        const stack = new Stack();

        new ContentfulWebhook(stack, 'ContentfulWebhook', {
            accessToken: '<access_token>',
            spaceId: '<space_id>',
            name: 'My webhook',
            url: 'https://www.example.com/test',
            topics: [
                'Entry.create',
                'ContentType.create',
                '*.publish',
                'Asset.*',
            ],
        });

        expect(stack).toMatchCdkSnapshot();
    });
});
