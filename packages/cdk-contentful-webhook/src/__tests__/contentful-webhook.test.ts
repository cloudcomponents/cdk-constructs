import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { ContentfulWebhook } from '../contentful-webhook';

describe('cdk-contentful-webhook', (): void => {
  test('snapshot', (): void => {
    const stack = new Stack();

    new ContentfulWebhook(stack, 'ContentfulWebhook', {
      accessToken: '<access_token>',
      spaceId: '<space_id>',
      name: 'My webhook',
      url: 'https://www.example.com/test',
      topics: ['Entry.create', 'ContentType.create', '*.publish', 'Asset.*'],
    });

    expect(stack).toMatchCdkSnapshot({
      propertyMatchers: {
        Parameters: expect.any(Object),
        Resources: {
          CustomContentfulWebhook91f2075fb9504743a66bee0f6febf50d4005AAA1: {
            Properties: {
              Code: expect.any(Object),
            },
          },
        },
      },
    });
  });
});
