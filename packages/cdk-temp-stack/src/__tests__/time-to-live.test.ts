import { Duration, Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { TimeToLive } from '../time-to-live';

test('default setup', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new TimeToLive(stack, 'TimeToLive', {
    ttl: Duration.minutes(10),
  });

  // THEN
  expect(stack).toMatchCdkSnapshot();
});
