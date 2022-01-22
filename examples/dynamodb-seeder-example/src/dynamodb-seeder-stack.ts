import * as path from 'path';
import { DynamoDBSeeder, Seeds } from '@cloudcomponents/cdk-dynamodb-seeder';
import { Stack, StackProps, RemovalPolicy, aws_dynamodb as dynamodb, aws_s3 as s3, aws_s3_deployment as s3_deployment } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DynamoDBSeederStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.NUMBER,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new DynamoDBSeeder(this, 'JsonFileSeeder', {
      table,
      seeds: Seeds.fromJsonFile(path.join(__dirname, '..', 'seeds.json')),
    });

    new DynamoDBSeeder(this, 'InlineSeeder', {
      table,
      seeds: Seeds.fromInline([
        {
          id: 3,
          column: 'foo',
        },
        {
          id: 4,
          column: 'bar',
        },
      ]),
    });

    const seedsBucket = new s3.Bucket(this, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const deploy = new s3_deployment.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3_deployment.Source.asset(path.join(__dirname, '..', 's3-seeds'))],
      destinationBucket: seedsBucket,
    });

    const seeder1 = new DynamoDBSeeder(this, 'BucketSeeder1', {
      table,
      seeds: Seeds.fromBucket(seedsBucket, 'seeds1.json'),
    });

    seeder1.node.addDependency(deploy);

    const seeder2 = new DynamoDBSeeder(this, 'BucketSeeder2', {
      table,
      seeds: Seeds.fromBucket(seedsBucket, 'seeds2.json'),
    });

    seeder2.node.addDependency(deploy);
  }
}
