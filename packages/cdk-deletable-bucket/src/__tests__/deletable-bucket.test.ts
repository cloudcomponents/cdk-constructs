import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { DeletableBucket } from '../deletable-bucket';

test('default setup', (): void => {
  const stack = new Stack();

  new DeletableBucket(stack, 'DeletableBucket');

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test('forceDelete', (): void => {
  const stack = new Stack();

  new DeletableBucket(stack, 'DeletableBucket', {
    forceDelete: true,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
