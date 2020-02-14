import { App, Stack, StackProps, Duration } from '@aws-cdk/core';
import { Schedule } from '@aws-cdk/aws-events';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import {
    BackupBucket,
    CodecommitBackup,
} from '@cloudcomponents/cdk-codecommit-backup';

export class CodecommitBackupStack extends Stack {
    public constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        const failedTopic = new Topic(this, 'FailedTopic');

        failedTopic.addSubscription(
            new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string),
        );

        const backupBucket = new BackupBucket(this, 'BackupBuckt', {
            retentionPeriod: Duration.days(90),
        });

        // The following example runs a task every day at 4am
        new CodecommitBackup(this, 'CodecommitBackup', {
            backupBucket,
            schedule: Schedule.cron({
                minute: '0',
                hour: '4',
            }),
            failedTopic,
        });
    }
}
