import { invokeLambda, createEvent } from 'aws-local-testing-library';
import { handler, HttpHeadersConfig } from '..';
import { getConfig, Logger, LogLevel } from '../../shared';

jest.mock('../../shared');

afterEach(() => {
  jest.resetAllMocks();
});

test('with headers', async () => {
  const logger = new Logger(LogLevel.warn);

  const config: HttpHeadersConfig = {
    logger,
    httpHeaders: {
      FOO: 'BAR',
    },
  };

  jest.mocked(getConfig).mockReturnValue(config);

  const originResponse = createEvent('cloudfront:OriginResponse');

  expect.assertions(1);

  const response = await invokeLambda(handler, originResponse);

  expect(response?.headers?.foo).toEqual(originResponse.Records[0].cf.response.headers.foo);
});

test('no headers', async () => {
  const logger = new Logger(LogLevel.warn);

  const config: HttpHeadersConfig = {
    logger,
    httpHeaders: {},
  };

  jest.mocked(getConfig).mockReturnValue(config);

  const originResponse = createEvent('cloudfront:OriginResponse');

  expect.assertions(1);

  const response = await invokeLambda(handler, originResponse);

  expect(response?.headers).toEqual(originResponse.Records[0].cf.response.headers);
});
