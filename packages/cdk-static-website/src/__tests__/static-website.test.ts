import { LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { Version } from '@aws-cdk/aws-lambda';
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

test('lambda at edge', (): void => {
  const stack = new Stack();

  const staticWebsite = new StaticWebsite(stack, 'StaticWebsite', {
    disableUpload: true,
  });

  staticWebsite.addLambdaFunctionAssociation({
    eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
    lambdaFunction: Version.fromVersionArn(stack, 'LambdaEdge', 'arn:aws:lambda:us-east-1:123456789012:function:my-function:1'),
  });

  expect(stack).toMatchCdkSnapshot();
});
