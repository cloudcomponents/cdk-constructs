import { App, Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { OriginMutation } from '../origin-mutation';

test('default setup: us-east-1', () => {
  // GIVEN
  const app = new App();

  const stack = new Stack(app, 'Dummy', {
    env: {
      region: 'us-east-1',
    },
  });

  // WHEN
  new OriginMutation(stack, 'OriginMutation');

  // THEN
  const supportStack = app.node.tryFindChild(`lambda-at-edge-support-stack`);

  expect(supportStack).toBeUndefined();

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
    propertyMatchers: {
      Resources: {
        originmutationProviderA4786C4E: {
          Properties: {
            Create: expect.any(Object),
            Update: expect.any(Object),
          },
        },
      },
    },
  });
});
