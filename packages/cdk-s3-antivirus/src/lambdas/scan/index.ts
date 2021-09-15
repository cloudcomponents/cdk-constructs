import * as path from 'path';
import type { S3CreateEvent, Context } from 'aws-lambda';
import { getEnv } from 'get-env-or-die';

import { AntiVirus, ScanResult } from '../shared/anti-virus';

const antiVirus = new AntiVirus({
  definitionsPath: path.join(getEnv('EFS_MOUNT_PATH'), getEnv('EFS_DEFINITIONS_PATH')),
  scanStatusTagName: getEnv('SCAN_STATUS_TAG_NAME'),
});

export const handler = async (event: S3CreateEvent, context: Context): Promise<ScanResult> => {
  const { name: bucket } = event.Records[0].s3.bucket;
  const { key } = event.Records[0].s3.object;

  const mirror = process.env.DEFINITIONS_URL as string;
  const downloadPath = path.join(getEnv('EFS_MOUNT_PATH'), context.awsRequestId);

  await antiVirus.updateDefinitions([`PrivateMirror ${mirror}`]);

  return antiVirus.scan(bucket, key, downloadPath);
};
