export const defaultContext = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'foo',
  functionVersion: 'foo',
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:012345678910:function:MyCustomResourceHandler',
  memoryLimitInMB: 'foo',
  awsRequestId: 'foo',
  logGroupName: 'foo',
  logStreamName: 'foo',
  getRemainingTimeInMillis: () => 5000,
  done: () => {},
  fail: () => {},
  succeed: () => {},
};
