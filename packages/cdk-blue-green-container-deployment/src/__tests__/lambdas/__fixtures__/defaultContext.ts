export const defaultContext = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'foo',
  functionVersion: 'foo',
  invokedFunctionArn: 'foo',
  memoryLimitInMB: 'foo',
  awsRequestId: 'foo',
  logGroupName: 'foo',
  logStreamName: 'foo',
  getRemainingTimeInMillis: () => 5000,
  done: () => {},
  fail: () => {},
  succeed: () => {},
};
