import { SnsDestination } from '@aws-cdk/aws-lambda-destinations';
import { Bucket } from '@aws-cdk/aws-s3';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

import { Scanner } from '@cloudcomponents/cdk-s3-antivirus';

export class S3AntivirusStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const topic = new Topic(this, 'Topic');
    topic.addSubscription(new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string));

    const scanner = new Scanner(this, 'Scanner', {
      onResult: new SnsDestination(topic),
      onError: new SnsDestination(topic),
    });

    scanner.addSourceBucket(bucket);
  }
}
