import type { ScheduledEvent, Context } from 'aws-lambda';
import { getEnv } from 'get-env-or-die';

import { AntiVirus } from '../shared/anti-virus';

const antiVirus = new AntiVirus({
  definitionsPath: '/tmp',
  scanStatusTagName: getEnv('SCAN_STATUS_TAG_NAME'),
});

export const handler = async (_event: ScheduledEvent, _context: Context): Promise<void> => {
  const bucket = getEnv('DEFINITIONS_BUCKET');

  await antiVirus.downloadDefinitions(bucket);
  await antiVirus.updateDefinitions([`DNSDatabaseInfo current.cvd.clamav.net`, `DatabaseMirror  database.clamav.net`, `CompressLocalDatabase yes`]);
  await antiVirus.uploadDefinitions(bucket);
};
