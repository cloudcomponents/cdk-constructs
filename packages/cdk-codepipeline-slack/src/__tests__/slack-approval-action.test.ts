import { Stack } from '@aws-cdk/cdk';
import { Pipeline } from '@aws-cdk/aws-codepipeline';
import { Bucket, PipelineSourceAction } from '@aws-cdk/aws-s3';
import { SlackApprovalAction } from '../slack-approval-action';
import { toMatchCdkSnapshot } from '@cloudcomponents/jest-cdk-snapshot';

expect.extend({ toMatchCdkSnapshot });

describe('cdk-codepipeline-slack: slack-approval-action', () => {
  it('snapshot', () => {
    const stack = new Stack();

    const bucket = new Bucket(stack, 'Bucket');

    new Pipeline(stack, 'Pipeline', {
      artifactBucket: bucket,
      stages: [
        {
          name: 'Source',
          actions: [
            new PipelineSourceAction({
              actionName: 'S3',
              bucket,
              bucketKey: 'file.zip'
            })
          ]
        },
        {
          name: 'Approve',
          actions: [
            new SlackApprovalAction({
              actionName: 'SlackApproval',
              slackBotToken: 'botToken',
              slackSigningSecret: 'signingSecret',
              slackChannel: 'channel',
              slackBotName: 'botName',
              additionalInformation: 'snapshotTest'
            })
          ]
        }
      ]
    });

    expect(stack).toMatchCdkSnapshot();
  });
});
