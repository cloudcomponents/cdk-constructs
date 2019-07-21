import { Stack } from '@aws-cdk/core';
import { toMatchCdkSnapshot } from '@cloudcomponents/jest-cdk-snapshot';
import { WebsiteBucket } from '../website-bucket';

expect.extend({ toMatchCdkSnapshot });

describe('cdk-static-website: website-bucket', (): void => {
    it('snapshot', (): void => {
        const stack = new Stack();

        new WebsiteBucket(stack, 'WebsiteBucket', {
            bucketName: 'testbucket',
            disableUpload: true,
        });

        expect(stack).toMatchCdkSnapshot();
    });
});
