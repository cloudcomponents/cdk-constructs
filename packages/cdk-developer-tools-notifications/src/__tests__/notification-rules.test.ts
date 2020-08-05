import { Repository } from '@aws-cdk/aws-codecommit';
import { Topic } from '@aws-cdk/aws-sns';
import { Stack } from '@aws-cdk/core';
import { SlackChannelConfiguration } from '@cloudcomponents/cdk-chatops';
import 'jest-cdk-snapshot';

import { RepositoryNotificationRule, RepositoryEvent } from '../notification-rules';
import { SlackChannel, SnsTopic } from '../notification-targets';

const createSlackChannel = (stack: Stack): SlackChannelConfiguration =>
  new SlackChannelConfiguration(stack, 'SlackChannelConfiguration', {
    configurationName: 'name',
    slackChannelId: 'channelId',
    slackWorkspaceId: 'workspaceId',
  });

test('repository notification rule', (): void => {
  const stack = new Stack();

  const slackChannel = createSlackChannel(stack);
  const topic = new Topic(stack, 'Topic');

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'repository-name',
  });

  new RepositoryNotificationRule(stack, 'RepositoryNotificationRule', {
    name: 'repository',
    repository,
    targets: [new SlackChannel(slackChannel), new SnsTopic(topic)],
    events: [RepositoryEvent.PULL_REQUEST_CREATED, RepositoryEvent.APPROVAL_STATUS_CHANGED],
  });

  expect(stack).toMatchCdkSnapshot();
});
