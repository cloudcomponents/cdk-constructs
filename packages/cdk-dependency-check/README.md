[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-dependency-check

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-dependency-check)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-dependency-check/)

> [OWASP dependency-check](https://owasp.org/www-project-dependency-check/) for codecommit repositories

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-dependency-check
```

Python:

```bash
pip install cloudcomponents.cdk-dependency-check
```

## How to use

```typescript
import { CodeCommitDependencyCheck } from '@cloudcomponents/cdk-dependency-check';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export class DependencyCheckStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    if (typeof process.env.REPOSITORY_NAME === 'undefined') {
      throw new Error('environment variable REPOSITORY_NAME undefined');
    }

    const repository = Repository.fromRepositoryName(this, 'Repository', process.env.REPOSITORY_NAME);

    const reportsBucket = new Bucket(this, 'Bucket');

    // The following example runs a task every day at 4am
    const check = new CodeCommitDependencyCheck(this, 'CodeCommitDependencyCheck', {
      repository,
      reportsBucket,
      preCheckCommand: 'npm i',
      schedule: Schedule.cron({
        minute: '0',
        hour: '4',
      }),
    });

    const checkTopic = new Topic(this, 'CheckTopic');

    if (process.env.DEVSECOPS_TEAM_EMAIL) {
      checkTopic.addSubscription(new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL));
    }

    check.onCheckStarted('started', {
      target: new SnsTopic(checkTopic),
    });

    check.onCheckSucceeded('succeeded', {
      target: new SnsTopic(checkTopic),
    });

    check.onCheckFailed('failed', {
      target: new SnsTopic(checkTopic),
    });
  }
}
```

## Upload HTML Reports

```typescript
const reportsBucket = new Bucket(this, 'Bucket');

// The following example runs a task every day at 4am
const check = new CodeCommitDependencyCheck(this, 'CodeCommitDependencyCheck', {
  repository,
  reportsBucket,
  preCheckCommand: 'npm i',
  schedule: Schedule.cron({
    minute: '0',
    hour: '4',
  }),
});
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-dependency-check/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-dependency-check/LICENSE)