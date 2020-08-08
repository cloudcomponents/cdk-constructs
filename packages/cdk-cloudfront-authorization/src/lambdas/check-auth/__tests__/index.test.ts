import type { CloudFrontResponseResult } from 'aws-lambda';
import { invokeLambda, createEvent } from 'aws-local-testing-library';
import { mocked } from 'ts-jest/utils';

import { handler } from '..';
import { getConfig, extractAndParseCookies, decodeIdToken, validate, Logger, LogLevel } from '../../shared';

jest.mock('../../shared/config');
jest.mock('../../shared/cookie');
jest.mock('../../shared/jwt');

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

  mocked(getConfig).mockReturnValue(config);
});

afterEach(() => {
  jest.resetAllMocks();
});

test('redirect to sign-in when no idToken exists', async () => {
  mocked(extractAndParseCookies).mockImplementation(() => ({
    tokenUserName: 'tokenUserName',
    scopes: 'scopes',
    nonce: '10Test',
    pkce: 'pkce',
    nonceHmac: 'original_nonceHmac',
  }));

  expect.assertions(2);

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  const response = (await invokeLambda(handler, viewRequest)) as CloudFrontResponseResult;

  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://auth.us-east-1.demo.aws.com/oauth2');
});

test('redirect to refreshauth when idToken expires and refresh token exists', async () => {
  mocked(extractAndParseCookies).mockImplementation(() => ({
    tokenUserName: 'tokenUserName',
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    scopes: 'scopes',
    nonce: '10Test',
    pkce: 'pkce',
    nonceHmac: 'original_nonceHmac',
  }));

  mocked(decodeIdToken).mockImplementation(() => ({
    sub: 'sub',
    aud: 'aud',
    token_use: 'id',
    auth_time: 4711,
    iat: 42,
    exp: Date.now() / 1000 - 60 * 20, //expire
  }));

  expect.assertions(2);

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  const response = (await invokeLambda(handler, viewRequest)) as CloudFrontResponseResult;

  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://d111111abcdef8.cloudfront.net/refreshauth');
});

test('return unchanged request to forward request to origin', async () => {
  mocked(extractAndParseCookies).mockImplementation(() => ({
    tokenUserName: 'tokenUserName',
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    scopes: 'scopes',
    nonce: '10Test',
    pkce: 'pkce',
    nonceHmac: 'original_nonceHmac',
  }));

  mocked(decodeIdToken).mockImplementation(() => ({
    sub: 'sub',
    aud: 'aud',
    token_use: 'id',
    auth_time: 4711,
    iat: 42,
    exp: Date.now() / 1000 + 60 * 20,
  }));

  expect.assertions(1);

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  const result = await invokeLambda(handler, viewRequest);

  expect(result).toBe(viewRequest.Records[0].cf.request);
});

test('redirect to sign-in when jwt is invalid', async () => {
  mocked(extractAndParseCookies).mockImplementation(() => ({
    tokenUserName: 'tokenUserName',
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    scopes: 'scopes',
    nonce: '10Test',
    pkce: 'pkce',
    nonceHmac: 'original_nonceHmac',
  }));

  mocked(decodeIdToken).mockImplementation(() => ({
    sub: 'sub',
    aud: 'aud',
    token_use: 'id',
    auth_time: 4711,
    iat: 42,
    exp: Date.now() / 1000 + 60 * 20,
  }));

  mocked(validate).mockImplementation(() => {
    throw new Error('Cannot parse JWT token');
  });

  expect.assertions(2);

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  const response = (await invokeLambda(handler, viewRequest)) as CloudFrontResponseResult;

  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://auth.us-east-1.demo.aws.com/oauth2');
});
