import type { ScheduledEvent, Context } from 'aws-lambda';

import { AntiVirus } from '../shared/anti-virus';

const antiVirus = new AntiVirus({
  definitionsPath: '/tmp',
});

export const handler = async (_event: ScheduledEvent, _context: Context): Promise<void> => {
  const bucket = process.env.DEFINITIONS_BUCKET as string;

  await antiVirus.downloadDefinitions(bucket);
  await antiVirus.updateDefinitions([`DNSDatabaseInfo current.cvd.clamav.net`, `DatabaseMirror  database.clamav.net`, `CompressLocalDatabase yes`]);
  await antiVirus.uploadDefinitions(bucket);

  return;
};
