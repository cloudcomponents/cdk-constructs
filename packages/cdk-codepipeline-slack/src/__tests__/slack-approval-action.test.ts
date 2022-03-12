import { Pipeline, Artifact } from 'aws-cdk-lib/aws-codepipeline';
import { S3SourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Stack } from 'aws-cdk-lib/core';
import 'jest-cdk-snapshot';

import { ChannelTypes } from '../channel-types';
import { SlackApprovalAction } from '../slack-approval-action';

test('default setup', (): void => {
  const stack = new Stack();

  const bucket = new Bucket(stack, 'Bucket');

  const sourceArtifact = new Artifact();

  new Pipeline(stack, 'Pipeline', {
    artifactBucket: bucket,
    stages: [
      {
        stageName: 'Source',
        actions: [
          new S3SourceAction({
            actionName: 'S3',
            bucket,
            bucketKey: 'file.zip',
            output: sourceArtifact,
          }),
        ],
      },
      {
        stageName: 'Approve',
        actions: [
          new SlackApprovalAction({
            actionName: 'SlackApproval',
            slackBotToken: 'botToken',
            slackSigningSecret: 'signingSecret',
            slackChannel: 'channel',
            slackBotName: 'botName',
            additionalInformation: 'snapshotTest',
          }),
        ],
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test('private & public channel', (): void => {
  const stack = new Stack();

  const bucket = new Bucket(stack, 'Bucket');

  const sourceArtifact = new Artifact();

  new Pipeline(stack, 'Pipeline', {
    artifactBucket: bucket,
    stages: [
      {
        stageName: 'Source',
        actions: [
          new S3SourceAction({
            actionName: 'S3',
            bucket,
            bucketKey: 'file.zip',
            output: sourceArtifact,
          }),
        ],
      },
      {
        stageName: 'Approve',
        actions: [
          new SlackApprovalAction({
            actionName: 'SlackApproval',
            slackBotToken: 'botToken',
            slackSigningSecret: 'signingSecret',
            slackChannel: 'channel',
            slackChannelTypes: [ChannelTypes.PUBLIC, ChannelTypes.PRIVATE],
            slackBotName: 'botName',
            additionalInformation: 'snapshotTest',
          }),
        ],
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
