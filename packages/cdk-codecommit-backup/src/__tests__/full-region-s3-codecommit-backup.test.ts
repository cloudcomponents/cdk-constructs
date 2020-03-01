import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { Schedule } from '@aws-cdk/aws-events';
import { Topic } from '@aws-cdk/aws-sns';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { FullRegionS3CodecommitBackup } from '../full-region-s3-codecommit-backup';
import { BackupBucket } from '../backup-bucket';

test('default setup', (): void => {
    const stack = new Stack();

    const backupBucket = new BackupBucket(stack, 'BackupBucket');

    // The following example runs a task every day at 4am
    new FullRegionS3CodecommitBackup(stack, 'FullRegionS3CodecommitBackup', {
        backupBucket,
        schedule: Schedule.cron({ minute: '0', hour: '4' }),
    });

    expect(stack).toMatchCdkSnapshot();
});

test('repositories', (): void => {
    const stack = new Stack();

    const backupBucket = new BackupBucket(stack, 'BackupBucket');

    // The following example runs a task every day at 4am
    new FullRegionS3CodecommitBackup(stack, 'FullRegionS3CodecommitBackup', {
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
    const backup = new FullRegionS3CodecommitBackup(
        stack,
        'FullRegionS3CodecommitBackup',
        {
            backupBucket,
            schedule: Schedule.cron({ minute: '0', hour: '4' }),
            repositoryNames: ['repo1', 'repo2'],
        },
    );

    backup.onBackupStarted('started', { target: new SnsTopic(topic) });

    backup.onBackupSucceeded('succeeded', { target: new SnsTopic(topic) });

    backup.onBackupFailed('failed', { target: new SnsTopic(topic) });

    expect(stack).toMatchCdkSnapshot();
});
