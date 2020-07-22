[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-dependency-check

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
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
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Schedule } from '@aws-cdk/aws-events';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { Bucket } from '@aws-cdk/aws-s3';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { CodeCommitDependencyCheck } from '@cloudcomponents/cdk-dependency-check';

export class DependencyCheckStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = Repository.fromRepositoryName(
      this,
      'Repository',
      process.env.REPOSITORY_NAME as string,
    );

    const reportsBucket = new Bucket(this, 'Bucket');

    // The following example runs a task every day at 4am
    const check = new CodeCommitDependencyCheck(
      this,
      'CodeCommitDependencyCheck',
      {
        repository,
        reportsBucket,
        preCheckCommand: 'npm i',
        schedule: Schedule.cron({
          minute: '0',
          hour: '4',
        }),
      },
    );

    const checkTopic = new Topic(this, 'CheckTopic');

    checkTopic.addSubscription(
      new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string),
    );

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

See [API.md](./API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](./LICENSE)