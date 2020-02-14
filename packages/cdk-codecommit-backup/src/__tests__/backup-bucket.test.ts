import { Stack, Duration } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { BackupBucket } from '../backup-bucket';

test('default setup', (): void => {
    const stack = new Stack();

    new BackupBucket(stack, 'BackupBucket');

    expect(stack).toMatchCdkSnapshot();
});

test('retentionPeriod', (): void => {
    const stack = new Stack();

    new BackupBucket(stack, 'BackupBucket', {
        retentionPeriod: Duration.days(4711),
    });

    expect(stack).toMatchCdkSnapshot();
});
