import { Scanner } from '@cloudcomponents/cdk-s3-antivirus';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { SnsDestination } from 'aws-cdk-lib/aws-lambda-destinations';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export class S3AntivirusStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const topic = new Topic(this, 'Topic');
    if (process.env.DEVSECOPS_TEAM_EMAIL) {
      topic.addSubscription(new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL));
    }

    const scanner = new Scanner(this, 'Scanner', {
      onResult: new SnsDestination(topic),
      onError: new SnsDestination(topic),
    });

    scanner.addSourceBucket(bucket);
  }
}
