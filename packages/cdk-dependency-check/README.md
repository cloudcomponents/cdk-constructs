# @cloudcomponents/cdk-dependency-check

> OWASP dependency-check

## Install

```bash
npm i @cloudcomponents/cdk-dependency-check
```

## How to use

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Schedule } from '@aws-cdk/aws-events';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { DependencyCheck } from '@cloudcomponents/cdk-dependency-check';

export class DependencyCheckStack extends Stack {
    public constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        const repository = Repository.fromRepositoryName(
            this,
            'Repository',
            process.env.REPOSITORY_NAME as string,
        );

        // The following example runs a task every day at 4am
        const check = new DependencyCheck(this, 'DependencyCheck', {
            repository,
            preCheckCommand: 'npm i',
            schedule: Schedule.cron({
                minute: '0',
                hour: '4',
            }),
        });

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

## License

[MIT](../../LICENSE)
