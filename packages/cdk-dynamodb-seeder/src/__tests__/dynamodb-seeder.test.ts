import * as path from 'path';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Bucket } from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { DynamoDBSeeder } from '../dynamodb-seeder';
import { Seeds } from '../seeds';

jest.mock('../directories', () => ({
  dynamodbSeederDir: path.join(__dirname, 'mocks', 'dynamodb-seeder'),
}));

test('inline', () => {
  // GIVEN
  const stack = new Stack();
  const table = new Table(stack, 'Table', {
    partitionKey: {
      name: 'id',
      type: AttributeType.NUMBER,
    },
  });

  // WHEN
  new DynamoDBSeeder(stack, 'DynamoDBSeeder', {
    table,
    seeds: Seeds.fromInline([
      {
        id: 1,
        column: 'foo',
      },
      {
        id: 2,
        column: 'bar',
      },
    ]),
  });

  // THEN
  expect(stack).toMatchCdkSnapshot();
});

test('json file', () => {
  // GIVEN
  const stack = new Stack();
  const table = new Table(stack, 'Table', {
    partitionKey: {
      name: 'id',
      type: AttributeType.NUMBER,
    },
  });

  // WHEN
  new DynamoDBSeeder(stack, 'DynamoDBSeeder', {
    table,
    seeds: Seeds.fromJsonFile(path.join(__dirname, 'mocks', 'seeds.json')),
  });

  // THEN
  expect(stack).toMatchCdkSnapshot();
});

test('json file: no such file', () => {
  // GIVEN
  const stack = new Stack();
  const table = new Table(stack, 'Table', {
    partitionKey: {
      name: 'id',
      type: AttributeType.NUMBER,
    },
  });

  // WHEN
  const addSeeder = () => {
    new DynamoDBSeeder(stack, 'DynamoDBSeeder', {
      table,
      seeds: Seeds.fromJsonFile(path.join(__dirname, 'mocks', 'XYZ.json')),
    });
  };

  // THEN
  expect(() => addSeeder()).toThrowError(/ENOENT: no such file or directory/);
});

test('json file: no json file', () => {
  // GIVEN
  const stack = new Stack();
  const table = new Table(stack, 'Table', {
    partitionKey: {
      name: 'id',
      type: AttributeType.NUMBER,
    },
  });

  // WHEN
  const addSeeder = () => {
    new DynamoDBSeeder(stack, 'DynamoDBSeeder', {
      table,
      seeds: Seeds.fromJsonFile(path.join(__dirname, 'mocks', 'nojson.txt')),
    });
  };

  // THEN
  expect(() => addSeeder()).toThrowError(new Error('Could not convert file to JSON'));
});

test('bucket', () => {
  // GIVEN
  const stack = new Stack();
  const table = new Table(stack, 'Table', {
    partitionKey: {
      name: 'id',
      type: AttributeType.NUMBER,
    },
  });

  const seedsBucket = Bucket.fromBucketName(stack, 'SeedsBucket', 'my-seeds-bucket');

  // WHEN
  new DynamoDBSeeder(stack, 'DynamoDBSeeder', {
    table,
    seeds: Seeds.fromBucket(seedsBucket, 'seeds.json'),
  });

  // THEN
  expect(stack).toMatchCdkSnapshot();
});
