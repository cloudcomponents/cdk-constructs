import {
  Construct,
  CustomResource,
  CustomResourceProvider,
  CustomResourceProviderRuntime,
  Duration,
} from '@aws-cdk/core';
import { ITable } from '@aws-cdk/aws-dynamodb';
import { Effect } from '@aws-cdk/aws-iam';
import { Bucket } from '@aws-cdk/aws-s3';

import { Seeds } from './seeds';
import { dynamodbSeederDir } from './directories';

export interface DynamoDBSeederProps {
  readonly table: ITable;
  readonly seeds: Seeds;

  /**
   * The function execution time (in seconds) after which Lambda terminates
   * the function. Because the execution time affects cost, set this value
   * based on the function's expected execution time.
   *
   * @default Duration.minutes(15)
   */
  readonly timeout?: Duration;
}

export class DynamoDBSeeder extends Construct {
  constructor(scope: Construct, id: string, props: DynamoDBSeederProps) {
    super(scope, id);

    const seeds = props.seeds.bind(this);

    const seedsBucket = seeds.s3Location?.bucketName
      ? Bucket.fromBucketName(this, 'SeedsBucket', seeds.s3Location.bucketName)
      : undefined;

    const serviceToken = CustomResourceProvider.getOrCreate(
      this,
      'Custom::DynamodbSeeder',
      {
        codeDirectory: dynamodbSeederDir,
        runtime: CustomResourceProviderRuntime.NODEJS_12,
        timeout: props.timeout ?? Duration.minutes(15),
        policyStatements: [
          {
            Effect: Effect.ALLOW,
            Action: ['dynamodb:BatchWriteItem'],
            Resource: props.table.tableArn,
          },
          seedsBucket
            ? {
                Effect: Effect.ALLOW,
                Action: ['s3:GetObject'],
                Resource: `${seedsBucket.bucketArn}/${
                  seeds.s3Location?.objectKey ?? '*'
                }`,
              }
            : undefined,
        ],
      },
    );

    new CustomResource(this, 'CustomResource', {
      serviceToken,
      resourceType: 'Custom::DynamodbSeeder',
      properties: {
        TableName: props.table.tableName,
        Seeds: {
          InlineSeeds: seeds.inlineSeeds,
          S3Bucket: seeds.s3Location && seeds.s3Location.bucketName,
          S3Key: seeds.s3Location && seeds.s3Location.objectKey,
          S3ObjectVersion: seeds.s3Location && seeds.s3Location.objectVersion,
        },
      },
    });
  }
}
