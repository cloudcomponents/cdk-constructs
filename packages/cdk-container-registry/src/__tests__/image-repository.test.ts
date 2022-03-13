import { Stack } from 'aws-cdk-lib';
import { Topic } from 'aws-cdk-lib/aws-sns';
import 'jest-cdk-snapshot';

import { ImageRepository, Severity } from '../image-repository';

test('default setup', (): void => {
  const stack = new Stack();

  new ImageRepository(stack, 'ImageRepository');

  expect(stack).toMatchCdkSnapshot();
});

test('forceDelete', (): void => {
  const stack = new Stack();

  new ImageRepository(stack, 'ImageRepository', {
    forceDelete: true,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test('onFinding', (): void => {
  const stack = new Stack();

  const alarmTopic = new Topic(stack, 'AlarmTopic');

  const repo = new ImageRepository(stack, 'ImageRepository', {
    imageScanOnPush: true,
  });

  repo.onFinding('finding', {
    severity: Severity.CRITICAL,
    alarmTopic,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
