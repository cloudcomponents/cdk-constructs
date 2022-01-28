import { Stack, aws_cloudfront, aws_lambda, Duration } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { StaticWebsite } from '../static-website';

test('default setup', () => {
  const stack = new Stack();

  new StaticWebsite(stack, 'StaticWebsite', {
    disableUpload: true,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test('lambda at edge', () => {
  const stack = new Stack();

  new StaticWebsite(stack, 'StaticWebsite', {
    disableUpload: true,
    edgeLambdas: [
      {
        eventType: aws_cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
        functionVersion: aws_lambda.Version.fromVersionArn(stack, 'LambdaEdge', 'arn:aws:lambda:us-east-1:123456789012:function:my-function:1'),
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test('test setting error responses', () => {
  const stack = new Stack();

  new StaticWebsite(stack, 'StaticWebsite', {
    disableUpload: true,
    errorResponses: [
      {
        httpStatus: 404,
        ttl: Duration.minutes(3),
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
      },
    ],
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
