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
