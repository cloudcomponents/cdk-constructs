import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

import { StaticWebsite } from '../static-website';

test('default setup', (): void => {
  const stack = new Stack();

  new StaticWebsite(stack, 'StaticWebsite', {
    disableUpload: true,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

// test('lambda at edge', (): void => {
//   const stack = new Stack();

//   const staticWebsite = new StaticWebsite(stack, 'StaticWebsite', {
//     disableUpload: true,
//   });

//   staticWebsite.addLambdaFunctionAssociation({
//     eventType: aws_cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
//     lambdaFunction: aws_lambda.Version.fromVersionArn(stack, 'LambdaEdge', 'arn:aws:lambda:us-east-1:123456789012:function:my-function:1'),
//   });

//   expect(stack).toMatchCdkSnapshot({
//     ignoreAssets: true,
//   });
// });

// test('test sertting errorConfigurations', (): void => {
//   const stack = new Stack();

//   new StaticWebsite(stack, 'StaticWebsite', {
//     disableUpload: true,
//     errorConfigurations: [
//       {
//         errorCode: 404,
//         errorCachingMinTtl: 3,
//         responseCode: 200,
//         responsePagePath: '/index.html',
//       },
//     ],
//   });

//   expect(stack).toMatchCdkSnapshot({
//     ignoreAssets: true,
//   });
// });
