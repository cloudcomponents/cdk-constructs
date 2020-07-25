import * as path from 'path';
import { Stack } from '@aws-cdk/core';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import 'jest-cdk-snapshot';

import { DynamoDBSeeder } from '../dynamodb-seeder';
import { Seeds } from '../seeds';

jest.mock('../directories', () => ({
  dynamodbSeederDir: path.join(__dirname, 'mocks', 'dynamodb-seeder'),
}));

test('default setup', () => {
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
