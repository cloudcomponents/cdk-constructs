import * as path from 'path';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Construct, Stack, StackProps, RemovalPolicy } from '@aws-cdk/core';
import { DynamoDBSeeder, Seeds } from '@cloudcomponents/cdk-dynamodb-seeder';

export class DynamoDBSeederStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const table = new Table(this, 'Table', {
      partitionKey: {
        name: 'id',
        type: AttributeType.NUMBER,
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

    const seedsBucket = new Bucket(this, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const deploy = new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset(path.join(__dirname, '..', 's3-seeds'))],
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
