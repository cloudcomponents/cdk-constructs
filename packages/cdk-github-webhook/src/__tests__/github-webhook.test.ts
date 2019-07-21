import { Stack } from '@aws-cdk/core';
import '@cloudcomponents/jest-cdk-snapshot';
import { GithubWebhook } from '../github-webhook';

describe('cdk-github-webhook', (): void => {
    it('snapshot', (): void => {
        const stack = new Stack();

        new GithubWebhook(stack, 'GithubWebhook', {
            githubApiToken: 'test12',
            githubRepoUrl: 'test',
            payloadUrl: 'test',
            events: ['test'],
        });

        expect(stack).toMatchCdkSnapshot();
    });
});
