import {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceCreateEvent,
} from 'aws-lambda';
import { DynamoDB, S3 } from 'aws-sdk';
import chunk from 'lodash.chunk';

// DynamoDB has a 25 item limit in batch requests
// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html
const MAX_BATCH_CHUNK = 25;

interface DynamoDBSeederProps {
  tableName: string;
  seeds: {
    inlineSeeds?: string;
    s3Bucket?: string;
    s3Key?: string;
    s3ObjectVersion?: string;
  };
}

type Seeds = Record<string, unknown>[];

const dynamodb = new DynamoDB.DocumentClient();
const s3 = new S3();

const getProperties = (
  props: CloudFormationCustomResourceEvent['ResourceProperties'],
): DynamoDBSeederProps => ({
  tableName: props.TableName,
  seeds: {
    inlineSeeds: props.Seeds.InlineSeeds,
    s3Bucket: props.Seeds.S3Bucket,
    s3Key: props.Seeds.S3Key,
    s3ObjectVersion: props.Seeds.S3ObjectVersion,
  },
});

const onCreate = async (
  event: CloudFormationCustomResourceCreateEvent,
): Promise<void> => {
  const props = getProperties(event.ResourceProperties);

  const { inlineSeeds, ...s3Location } = props.seeds;

  const seeds = inlineSeeds
    ? JSON.parse(inlineSeeds)
    : await getSeedsFromS3(s3Location);

  await writeSeeds(props.tableName, seeds);

  console.log(`Seed running complete for table ${props.tableName}`);
};

const getSeedsFromS3 = async (s3Location: {
  s3Bucket?: string;
  s3Key?: string;
  s3ObjectVersion?: string;
}): Promise<Seeds> => {
  const { s3Bucket, s3Key, s3ObjectVersion } = s3Location;

  if (!s3Bucket || !s3Key) {
    throw new Error('Bucket configuration missing!');
  }

  const { Body: body } = await s3
    .getObject({
      Bucket: s3Bucket,
      Key: s3Key,
      VersionId: s3ObjectVersion,
    })
    .promise();

  return JSON.parse(body.toString()) as Seeds;
};

const writeSeeds = async (tableName: string, seeds: Seeds): Promise<void> => {
  const seedChunks = chunk(seeds, MAX_BATCH_CHUNK);

  console.log(`Sending data to dynamodb: ${seedChunks.length} chunks`);

  await Promise.all(
    seedChunks.map(async (seedChunk) => {
      const requests = seedChunk.map((seed) => ({
        PutRequest: {
          Item: seed,
        },
      }));

      return dynamodb
        .batchWrite({
          RequestItems: {
            [tableName]: requests,
          },
        })
        .promise();
    }),
  );
};

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<void> => {
  const requestType = event.RequestType;

  switch (requestType) {
    case 'Create':
      return onCreate(event as CloudFormationCustomResourceCreateEvent);
    case 'Update':
      return;
    case 'Delete':
      return;
    default:
      throw new Error(`Invalid request type: ${requestType}`);
  }
};
