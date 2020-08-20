import { Stack, RemovalPolicy } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { WebsiteBucket } from '../website-bucket';

test('default setup', (): void => {
  const stack = new Stack();

  new WebsiteBucket(stack, 'WebsiteBucket', {
    bucketName: 'testbucket',
    disableUpload: true,
  });

  expect(stack).toMatchCdkSnapshot();
});

test('removalPolicy = DESTROY', (): void => {
  const stack = new Stack();

  new WebsiteBucket(stack, 'WebsiteBucket', {
    bucketName: 'testbucket',
    disableUpload: true,
    removalPolicy: RemovalPolicy.DESTROY,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
