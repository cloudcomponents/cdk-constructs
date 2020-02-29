import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { StaticWebsite } from '../static-website';

test('default setup', (): void => {
    const stack = new Stack();

    new StaticWebsite(stack, 'StaticWebsite', {
        disableUpload: true,
    });

    expect(stack).toMatchCdkSnapshot();
});
