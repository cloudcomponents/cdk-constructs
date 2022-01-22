//import { SynthUtils } from '@aws-cdk/assert';
import { App, Duration, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
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
  expect(() => Template.fromStack(stack)).toThrowError(/Found 2 instances of the TimeToLive construct/);
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
  expect(() => Template.fromStack(stack)).toThrowError(/Found 2 instances of the TimeToLive construct/);
});
