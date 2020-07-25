import { App, Duration } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { TempStack } from '../temp-stack';

test('default setup', () => {
  // GIVEN
  const app = new App();

  // WHEN
  const stack = new TempStack(app, 'TestStack', {
    ttl: Duration.minutes(10),
  });

  // THEN
  expect(stack).toMatchCdkSnapshot();
});
