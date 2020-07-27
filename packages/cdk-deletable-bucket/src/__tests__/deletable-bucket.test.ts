import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { DeletableBucket } from '../deletable-bucket';

test('default setup', (): void => {
  const stack = new Stack();

  new DeletableBucket(stack, 'DeletableBucket');

  expect(stack).toMatchCdkSnapshot();
});

test('forceDelete', (): void => {
  const stack = new Stack();

  new DeletableBucket(stack, 'DeletableBucket', {
    forceDelete: true,
  });

  expect(stack).toMatchCdkSnapshot();
});
