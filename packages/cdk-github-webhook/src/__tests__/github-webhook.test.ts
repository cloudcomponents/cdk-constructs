import { Stack } from '@aws-cdk/core';
import { GithubWebhook } from '../github-webhook';
import { toMatchCdkSnapshot } from '@cloudcomponents/jest-cdk-snapshot';

expect.extend({ toMatchCdkSnapshot });

describe('cdk-github-webhook', () => {
  it('snapshot', () => {
    const stack = new Stack();

    new GithubWebhook(stack, 'GithubWebhook', {
      githubApiToken: 'test12',
      githubRepoUrl: 'test',
      payloadUrl: 'test',
      events: ['test']
    });

    expect(stack).toMatchCdkSnapshot();
  });
});
