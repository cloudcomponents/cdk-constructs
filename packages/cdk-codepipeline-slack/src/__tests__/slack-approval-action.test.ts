import { Stack } from '@aws-cdk/core';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import { S3SourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { Bucket } from '@aws-cdk/aws-s3';
import 'jest-cdk-snapshot';

import { SlackApprovalAction } from '../slack-approval-action';

describe('cdk-codepipeline-slack: slack-approval-action', (): void => {
    it('snapshot', (): void => {
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

        expect(stack).toMatchCdkSnapshot();
    });
});
