import { stringify, parse } from 'querystring';
import { invokeLambda, createEvent } from 'aws-local-testing-library';
import { mocked } from 'ts-jest/utils';

import { handler } from '..';
import { getConfig, Logger, LogLevel, httpPostWithRetry, extractAndParseCookies, sign, generateCookieHeaders, urlSafe, validate } from '../../shared';

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
    return 'grant_type=authorization_code&client_id=clientId&redirect_uri=https%3A%2F%2FdomainName%2FredirectPathSignIn&code=code&code_verifier=pkce';
  });

  mocked(parse).mockImplementation(() => {
    return { code: 'code', state: 'state' };
  });

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

  mocked(urlSafe).parse.mockImplementation(() =>
    Buffer.from(
      JSON.stringify({
        requestedUri: '/requestedUri',
        nonce: '10Test',
      }),
    ).toString('base64'),
  );

  mocked(sign).mockImplementation(() => 'original_nonceHmac');

  mocked(generateCookieHeaders).newTokens.mockReturnValue([]);

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  expect.assertions(2);

  const response = await invokeLambda(handler, viewRequest);

  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://d111111abcdef8.cloudfront.net/requestedUri');
});

test('redirect to domain when already signed in (idToken)', async () => {
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

  const mock = mocked(validate).mockImplementation(jest.fn());

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  console.error = jest.fn();

  expect.assertions(4);

  const response = await invokeLambda(handler, viewRequest);

  expect(console.error).toHaveBeenCalled();
  expect(mock).toHaveBeenCalled();

  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://d111111abcdef8.cloudfront.net');
});

test('show error page when token validation fails', async () => {
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

  mocked(validate).mockImplementation(() => {
    throw new Error('Token validation fails');
  });

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  console.error = jest.fn();

  expect.assertions(2);

  const response = await invokeLambda(handler, viewRequest);

  expect(console.error).toHaveBeenCalled();

  expect(response?.status).toBe('200');
});

test('show error page in case of cognito error', async () => {
  const mock = mocked(extractAndParseCookies).mockImplementation(jest.fn());

  mocked(parse).mockImplementation(() => {
    return { error: 'Error message description' };
  });

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  console.error = jest.fn();

  expect.assertions(3);

  const response = await invokeLambda(handler, viewRequest);

  expect(mock).toHaveBeenCalled();

  expect(console.error).toHaveBeenCalled();

  expect(response?.status).toBe('200');
});
