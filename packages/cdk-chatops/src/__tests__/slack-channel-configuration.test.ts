import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { SlackChannelConfiguration } from '../slack-channel-configuration';

test('default setup', (): void => {
    const stack = new Stack();

    new SlackChannelConfiguration(stack, 'SlackChannelConfiguration', {
        configurationName: 'name',
        slackChannelId: 'channelId',
        slackWorkspaceId: 'workspaceId',
    });

    expect(stack).toMatchCdkSnapshot();
});
