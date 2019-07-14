import { Stack } from '@aws-cdk/core';
import { WebsiteBucket } from '../website-bucket';
import { toMatchCdkSnapshot } from '@cloudcomponents/jest-cdk-snapshot';

expect.extend({ toMatchCdkSnapshot });

describe('cdk-static-website: website-bucket', () => {
  it('snapshot', () => {
    const stack = new Stack();

    new WebsiteBucket(stack, 'WebsiteBucket', {
      bucketName: 'testbucket',
      disableUpload: true
    });

    expect(stack).toMatchCdkSnapshot();
  });
});
