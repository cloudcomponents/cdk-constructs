![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-codecommit-backup

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-codecommit-backup)

> Backup CodeCommit repositories to S3

## Install

```bash
npm i @cloudcomponents/cdk-codecommit-backup
```

## How to use

```typescript
import { App, Stack, StackProps, Duration } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Schedule } from '@aws-cdk/aws-events';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import {
  BackupBucket,
  S3CodeCommitBackup,
} from '@cloudcomponents/cdk-codecommit-backup';

export class S3CodeCommitBackupStack extends Stack {
  public constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = Repository.fromRepositoryName(
      this,
      'Repository',
      process.env.REPOSITORY_NAME as string,
    );

    const backupBucket = new BackupBucket(this, 'BackupBuckt', {
      retentionPeriod: Duration.days(90),
    });

    // The following example runs a task every day at 4am
    const backup = new S3CodeCommitBackup(this, 'S3CodeCommitBackup', {
      backupBucket,
      repository,
      schedule: Schedule.cron({
        minute: '0',
        hour: '4',
      }),
    });

    const backupTopic = new Topic(this, 'BackupTopic');

    backupTopic.addSubscription(
      new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string),
    );

    backup.onBackupStarted('started', {
      target: new SnsTopic(backupTopic),
    });

    backup.onBackupSucceeded('succeeded', {
      target: new SnsTopic(backupTopic),
    });

    backup.onBackupFailed('failed', {
      target: new SnsTopic(backupTopic),
    });
  }
}
```

## Full region backups

By default, the construct creates backups for all repositories in a region. Individual respositories can be specified using the parameter `repositoryNames`.

```typescript
import { App, Stack, StackProps, Duration } from '@aws-cdk/core';
import { Schedule } from '@aws-cdk/aws-events';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import {
  BackupBucket,
  FullRegionS3CodeCommitBackup,
} from '@cloudcomponents/cdk-codecommit-backup';

export class FullRegionS3CodeCommitBackupStack extends Stack {
  public constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const backupBucket = new BackupBucket(this, 'BackupBuckt', {
      retentionPeriod: Duration.days(90),
    });

    // The following example runs a task every day at 4am
    const backup = new FullRegionS3CodeCommitBackup(
      this,
      'FullRegionS3CodeCommitBackup',
      {
        backupBucket,
        // repositoryNames: ['repo1', 'repo2'],
        schedule: Schedule.cron({
          minute: '0',
          hour: '4',
        }),
      },
    );

    const backupTopic = new Topic(this, 'BackupTopic');

    backupTopic.addSubscription(
      new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string),
    );

    backup.onBackupStarted('started', {
      target: new SnsTopic(backupTopic),
    });

    backup.onBackupSucceeded('succeeded', {
      target: new SnsTopic(backupTopic),
    });

    backup.onBackupFailed('failed', {
      target: new SnsTopic(backupTopic),
    });
  }
}
```

## Example

See more complete [examples](../../examples).

## License

[MIT](./LICENSE)
