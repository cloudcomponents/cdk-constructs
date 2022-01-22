import { invokeLambda, createEvent } from 'aws-local-testing-library';

import { handler } from '..';
import { getConfig, extractAndParseCookies, Logger, LogLevel } from '../../shared';

jest.mock('../../shared/config');
jest.mock('../../shared/cookie');

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

  jest.mocked(getConfig).mockReturnValue(config);
});

afterEach(() => {
  jest.resetAllMocks();
});

test('redirect to logout', async () => {
  jest.mocked(extractAndParseCookies).mockImplementation(() => ({
    idToken: 'idToken',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  }));

  expect.assertions(2);

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  const response = await invokeLambda(handler, viewRequest);

  expect(response?.status).toBe('307');
  expect(response?.headers?.location[0].value).toMatch('https://auth.us-east-1.demo.aws.com/logout');
});

test('show error page', async () => {
  jest.mocked(extractAndParseCookies).mockImplementation(() => ({
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  }));

  expect.assertions(1);

  const viewRequest = createEvent('cloudfront:ViewerRequest');

  const response = await invokeLambda(handler, viewRequest);

  expect(response?.status).toBe('200');
});
