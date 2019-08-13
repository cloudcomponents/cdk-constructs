import { Stack } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import 'jest-cdk-snapshot';

import { PullRequestCheck } from '../pull_request_check';

describe('cdk-pull-request-check', (): void => {
    it('snapshot', (): void => {
        const stack = new Stack();

        const repository = new Repository(stack, 'Repository', {
            repositoryName: 'MyRepositoryName',
            description: 'Some description.', // optional property
        });

        new PullRequestCheck(stack, 'PullRequestCheck', {
            repository,
            buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
        });

        expect(stack).toMatchCdkSnapshot();
    });
});
