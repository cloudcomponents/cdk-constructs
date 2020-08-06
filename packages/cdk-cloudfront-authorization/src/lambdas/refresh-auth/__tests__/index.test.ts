import { stringify, parse } from 'querystring';
import { invokeLambda, createEvent } from 'aws-local-testing-library';
import { mocked } from 'ts-jest/utils';

import { handler } from '..';
import { getConfig, Logger, LogLevel, httpPostWithRetry, extractAndParseCookies, generateCookieHeaders } from '../../shared';

jest.mock('querystring');
jest.mock('../../shared/config');
jest.mock('../../shared/cookie');
jest.mock('../../shared/jwt');
jest.mock('../../shared/request');

beforeEach(() => {
  const logger = new Logger(LogLevel.warn);

  const userPoolId = 'us-east-1_zy3bsrpUXS';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userPoolRegion = /^(\S+?)_\S+$/.exec(userPoolId)![1];
  const tokenIssuer = `https://cognito-idp.${userPoolRegion}.amazonaws.com/${userPoolId}`;
  const tokenJwksUri = `${tokenIssuer}/.well-known/jwks.json`;

  const config = {
    userPoolId,
    clientId: '7brfkhdsdhoqa34941ghu78ad8n',
    oauthScopes: ['openid'],
    cognitoAuthDomain: 'auth.us-east-1.demo.aws.com',
    redirectPathSignIn: '/parseauth',
    redirectPathSignOut: '/',
    redirectPathAuthRefresh: '/refreshauth',
    cookieSettings: {
      idToken: 'Path=/; Secure; SameSite=Lax',
      accessToken: 'Path=/; Secure; SameSite=Lax',
      refreshToken: 'Path=/; Secure; SameSite=Lax',
      nonce: 'Path=/; Secure; HttpOnly; Max-Age=300; SameSite=Lax',
    },
    cloudFrontHeaders: {
      'content-security-policy': [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
        },
      ],
      'strict-transport-security': [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubdomains; preload',
        },
      ],
      'referrer-policy': [
        {
          key: 'Referrer-Policy',
          value: 'same-origin',
        },
      ],
      'x-content-type-options': [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
      'x-frame-options': [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
      ],
      'x-xss-protection': [
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
      'cache-control': [
        {
          key: 'Cache-Control',
          value: 'no-cache',
        },
      ],
    },
    logger,
    clientSecret: 'clientSecret',
    nonceSigningSecret: 'nonceSigningSecret',
    nonceMaxAge: 20,
    nonceLength: 16,
    pkceLength: 43,
    secretAllowedCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~',
    tokenIssuer,
    tokenJwksUri,
  };

  mocked(getConfig).mockResolvedValue(config);
});

afterEach(() => {
  jest.resetAllMocks();
});

test('redirect to requestedUri', async () => {
  mocked(stringify).mockImplementation(() => {
    return 'grant_type=refresh_token&client_id=client_id&refresh_token=refreshToken';
  });

  mocked(parse).mockImplementation(() => {
    return { requestedUri: '/requestedUri', nonce: '10Test' };
  });

  mocked(extractAndParseCookies).mockImplementation(() => ({
    tokenUserName: 'tokenUserName',
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    scopes: 'scopes',
    nonce: '10Test',
    pkce: 'pkce',
  }));

  mocked(httpPostWithRetry).mockResolvedValue({
    status: 200,
    statusText: 'OK',
    config: {},
    headers: 'headers',
    data: {
      id_token: 'idToken',
      access_token: 'accessToken',
      refresh_token: 'refreshToken',
    },
  });

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  expect.assertions(2);

  const response = await invokeLambda(handler, viewRequest);

  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://d111111abcdef8.cloudfront.net/requestedUri');
});

test('redirect to domain when post request fails', async () => {
  mocked(stringify).mockImplementation(() => {
    return 'grant_type=refresh_token&client_id=client_id&refresh_token=refreshToken';
  });

  mocked(parse).mockImplementation(() => {
    return { requestedUri: '/requestedUri', nonce: '10Test' };
  });

  mocked(extractAndParseCookies).mockImplementation(() => ({
    tokenUserName: 'tokenUserName',
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    scopes: 'scopes',
    nonce: '10Test',
    pkce: 'pkce',
  }));

  mocked(httpPostWithRetry).mockRejectedValue('HTTP POST to url failed');

  const mock = mocked(generateCookieHeaders).refreshFailed.mockImplementation(jest.fn());

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  expect.assertions(3);

  const response = await invokeLambda(handler, viewRequest);

  expect(mock).toBeCalled();
  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://d111111abcdef8.cloudfront.net/requestedUri');
});

test('show error page when nonce not match', async () => {
  mocked(stringify).mockImplementation(() => {
    return 'grant_type=refresh_token&client_id=client_id&refresh_token=refreshToken';
  });

  mocked(parse).mockImplementation(() => {
    return { requestedUri: '/requestedUri', nonce: 'wrong' };
  });

  mocked(extractAndParseCookies).mockImplementation(() => ({
    tokenUserName: 'tokenUserName',
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    scopes: 'scopes',
    nonce: '10Test',
    pkce: 'pkce',
  }));

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  expect.assertions(1);

  const response = await invokeLambda(handler, viewRequest);

  expect(response?.status).toBe('200');
});
