import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { GithubWebhook } from '../github-webhook';

describe('cdk-github-webhook', (): void => {
  test('snapshot', (): void => {
    const stack = new Stack();

    new GithubWebhook(stack, 'GithubWebhook', {
      githubApiToken: 'test12',
      githubRepoUrl: 'test',
      payloadUrl: 'test',
      events: ['test'],
    });

    expect(stack).toMatchCdkSnapshot({
      propertyMatchers: {
        Parameters: expect.any(Object),
        Resources: {
          CustomGithubWebhook83CBF3EB7B6244F28C678441E4C1232EA4E17075: {
            Properties: {
              Code: expect.any(Object),
            },
          },
        },
      },
    });
  });
});
