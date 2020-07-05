import { SNS } from 'aws-sdk';

import { Severity } from '../../image-repository';

export interface FilterEvent {
  account: string;
  region: string;
  time: string;
  repositoryName: string;
  imageDigest: string;
  imageTags?: string[];
  findingSeveriyCounts: Record<Severity, number>;
  severity: Severity;
  alarmTopicArn: string;
}

const sns = new SNS();

export const handler = async (event: FilterEvent): Promise<void> => {
  const {
    alarmTopicArn,
    severity,
    repositoryName,
    findingSeveriyCounts,
    ...messageProps
  } = event;

  const alarmMessage = {
    message: `${severity} finding in repository ${repositoryName}`,
    findingSeveriyCounts,
    severity,
    repositoryName,
    ...messageProps,
  };

  if (findingSeveriyCounts[severity]) {
    await sns
      .publish({
        Message: JSON.stringify(alarmMessage),
        TargetArn: alarmTopicArn,
      })
      .promise();
  }
};
