import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { Repository } from '@aws-cdk/aws-codecommit';
import { Schedule } from '@aws-cdk/aws-events';
import { Topic } from '@aws-cdk/aws-sns';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { CodeCommitDependencyCheck } from '../codecommit-dependency-check';

test('default setup', (): void => {
    const stack = new Stack();

    const repository = Repository.fromRepositoryName(
        stack,
        'Repository',
        'repo1',
    );

    new CodeCommitDependencyCheck(stack, 'CodeCommitDependencyCheck', {
        repository,
        schedule: Schedule.cron({
            minute: '0',
            hour: '4',
        }),
    });

    expect(stack).toMatchCdkSnapshot();
});

test('preCheckCommand', (): void => {
    const stack = new Stack();

    const repository = Repository.fromRepositoryName(
        stack,
        'Repository',
        'repo1',
    );

    new CodeCommitDependencyCheck(stack, 'CodeCommitDependencyCheck', {
        repository,
        preCheckCommand: 'npm i',
        schedule: Schedule.cron({
            minute: '0',
            hour: '4',
        }),
    });

    expect(stack).toMatchCdkSnapshot();
});

test('events', (): void => {
    const stack = new Stack();

    const repository = Repository.fromRepositoryName(
        stack,
        'Repository',
        'repo1',
    );

    const check = new CodeCommitDependencyCheck(
        stack,
        'CodeCommitDependencyCheck',
        {
            repository,
            schedule: Schedule.cron({
                minute: '0',
                hour: '4',
            }),
        },
    );

    const checkTopic = new Topic(stack, 'CheckTopic');

    check.onCheckStarted('started', {
        target: new SnsTopic(checkTopic),
    });

    check.onCheckSucceeded('succeeded', {
        target: new SnsTopic(checkTopic),
    });

    check.onCheckFailed('failed', {
        target: new SnsTopic(checkTopic),
    });

    expect(stack).toMatchCdkSnapshot();
});
