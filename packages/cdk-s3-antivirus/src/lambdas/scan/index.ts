import * as path from 'path';
import type { S3CreateEvent, Context } from 'aws-lambda';

import { AntiVirus, ScanResult } from '../shared/anti-virus';

const antiVirus = new AntiVirus({
  definitionsPath: path.join(process.env.EFS_MOUNT_PATH as string, process.env.EFS_DEFINITIONS_PATH as string),
});

export const handler = async (event: S3CreateEvent, context: Context): Promise<ScanResult> => {
  const { name: bucket } = event.Records[0].s3.bucket;
  const { key } = event.Records[0].s3.object;

  const mirror = process.env.DEFINITIONS_URL as string;
  const downloadPath = path.join(process.env.EFS_MOUNT_PATH as string, context.awsRequestId);

  await antiVirus.updateDefinitions([`PrivateMirror ${mirror}`]);
  return antiVirus.scan(bucket, key, downloadPath);
};
