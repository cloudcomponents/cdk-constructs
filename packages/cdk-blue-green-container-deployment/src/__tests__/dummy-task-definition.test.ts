import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { DummyTaskDefinition } from '../dummy-task-definition';

test('default setup', (): void => {
  const stack = new Stack();

  new DummyTaskDefinition(stack, 'DummyTaskDefinition', {
    image: 'image',
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
