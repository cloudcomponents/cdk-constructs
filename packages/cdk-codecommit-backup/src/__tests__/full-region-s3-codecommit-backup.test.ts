import 'jest-cdk-snapshot';
import { Schedule } from '@aws-cdk/aws-events';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { Topic } from '@aws-cdk/aws-sns';
import { Stack } from '@aws-cdk/core';

import { BackupBucket } from '../backup-bucket';
import { FullRegionS3CodeCommitBackup } from '../full-region-s3-codecommit-backup';

test('default setup', (): void => {
  const stack = new Stack();

  const backupBucket = new BackupBucket(stack, 'BackupBucket');

  // The following example runs a task every day at 4am
  new FullRegionS3CodeCommitBackup(stack, 'FullRegionS3CodeCommitBackup', {
    backupBucket,
    schedule: Schedule.cron({ minute: '0', hour: '4' }),
  });

  expect(stack).toMatchCdkSnapshot();
});

test('repositories', (): void => {
  const stack = new Stack();

  const backupBucket = new BackupBucket(stack, 'BackupBucket');

  // The following example runs a task every day at 4am
  new FullRegionS3CodeCommitBackup(stack, 'FullRegionS3CodeCommitBackup', {
    backupBucket,
    schedule: Schedule.cron({ minute: '0', hour: '4' }),
    repositoryNames: ['repo1', 'repo2'],
  });

  expect(stack).toMatchCdkSnapshot();
});

test('events', (): void => {
  const stack = new Stack();

  const topic = new Topic(stack, 'Topic');

  const backupBucket = new BackupBucket(stack, 'BackupBucket');

  // The following example runs a task every day at 4am
  const backup = new FullRegionS3CodeCommitBackup(stack, 'FullRegionS3CodeCommitBackup', {
    backupBucket,
    schedule: Schedule.cron({ minute: '0', hour: '4' }),
    repositoryNames: ['repo1', 'repo2'],
  });

  backup.onBackupStarted('started', { target: new SnsTopic(topic) });

  backup.onBackupSucceeded('succeeded', { target: new SnsTopic(topic) });

  backup.onBackupFailed('failed', { target: new SnsTopic(topic) });

  expect(stack).toMatchCdkSnapshot();
});
