import { App, Duration, Stack } from '@aws-cdk/core';
import { SynthUtils } from '@aws-cdk/assert';
import 'jest-cdk-snapshot';

import { TempStack } from '../temp-stack';
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

test('multiple instances', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new TimeToLive(stack, 'TimeToLive1', {
    ttl: Duration.minutes(10),
  });

  new TimeToLive(stack, 'TimeToLive2', {
    ttl: Duration.minutes(10),
  });

  // THEN
  expect(() => SynthUtils.toCloudFormation(stack)).toThrowError(
    /Found 2 instances of the TimeToLive construct/,
  );
});

test('one instance + temp stack', () => {
  // GIVEN
  const app = new App();

  // WHEN
  const stack = new TempStack(app, 'TestStack', {
    ttl: Duration.minutes(10),
  });

  new TimeToLive(stack, 'TimeToLive2', {
    ttl: Duration.minutes(10),
  });

  // THEN
  expect(() => SynthUtils.toCloudFormation(stack)).toThrowError(
    /Found 2 instances of the TimeToLive construct/,
  );
});
