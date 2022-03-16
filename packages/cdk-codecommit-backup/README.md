[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-codecommit-backup

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-codecommit-backup)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-codecommit-backup/)
[![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk) 

> Backup CodeCommit repositories to S3

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-codecommit-backup
```

Python:

```bash
pip install cloudcomponents.cdk-codecommit-backup
```

## How to use

```typescript
import { BackupBucket, S3CodeCommitBackup } from '@cloudcomponents/cdk-codecommit-backup';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export class CodeCommitBackupStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    if (typeof process.env.REPOSITORY_NAME === 'undefined') {
      throw new Error('environment variable REPOSITORY_NAME undefined');
    }
    const repository = Repository.fromRepositoryName(this, 'Repository', process.env.REPOSITORY_NAME);

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

    if (process.env.DEVSECOPS_TEAM_EMAIL) {
      backupTopic.addSubscription(new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL));
    }

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

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-codecommit-backup/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-codecommit-backup/LICENSE)
