import type { CloudFrontHeaders } from 'aws-lambda';
import { parse } from 'cookie';
import { decodeIdToken } from './jwt';

export interface CookieSettings {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  nonce: string;
}

interface GenerateCookieHeadersParam {
  clientId: string;
  oauthScopes: string[];
  domainName: string;
  cookieSettings: CookieSettings;
  tokens: {
    id_token: string;
    access_token: string;
    refresh_token: string;
  };
}

export function extractAndParseCookies(
  headers: CloudFrontHeaders,
  clientId: string,
): {
  tokenUserName?: string;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  scopes?: string;
  nonce?: string;
  nonceHmac?: string;
  pkce?: string;
} {
  const cookies = extractCookiesFromHeaders(headers);
  if (!cookies) {
    return {};
  }

  const keyPrefix = `CognitoIdentityServiceProvider.${clientId}`;
  const lastUserKey = `${keyPrefix}.LastAuthUser`;
  const tokenUserName = cookies[lastUserKey];

  const scopeKey = `${keyPrefix}.${tokenUserName}.tokenScopesString`;
  const scopes = cookies[scopeKey];

  const idTokenKey = `${keyPrefix}.${tokenUserName}.idToken`;
  const idToken = cookies[idTokenKey];

  const accessTokenKey = `${keyPrefix}.${tokenUserName}.accessToken`;
  const accessToken = cookies[accessTokenKey];

  const refreshTokenKey = `${keyPrefix}.${tokenUserName}.refreshToken`;
  const refreshToken = cookies[refreshTokenKey];

  return {
    tokenUserName,
    idToken,
    accessToken,
    refreshToken,
    scopes,
    nonce: cookies['spa-auth-edge-nonce'],
    nonceHmac: cookies['spa-auth-edge-nonce-hmac'],
    pkce: cookies['spa-auth-edge-pkce'],
  };
}

export const generateCookieHeaders = {
  newTokens: (param: GenerateCookieHeadersParam): { key: string; value: string }[] => _generateCookieHeaders({ ...param, event: 'newTokens' }),
  signOut: (param: GenerateCookieHeadersParam): { key: string; value: string }[] => _generateCookieHeaders({ ...param, event: 'signOut' }),
  refreshFailed: (param: GenerateCookieHeadersParam): { key: string; value: string }[] =>
    _generateCookieHeaders({ ...param, event: 'refreshFailed' }),
};

function _generateCookieHeaders(
  param: GenerateCookieHeadersParam & {
    event: 'newTokens' | 'signOut' | 'refreshFailed';
  },
): { key: string; value: string }[] {
  // Set cookies with the exact names and values Amplify uses for seamless interoperability with Amplify
  const decodedIdToken = decodeIdToken(param.tokens.id_token);
  const tokenUserName = decodedIdToken['cognito:username'];
  const keyPrefix = `CognitoIdentityServiceProvider.${param.clientId}`;
  const idTokenKey = `${keyPrefix}.${tokenUserName}.idToken`;
  const accessTokenKey = `${keyPrefix}.${tokenUserName}.accessToken`;
  const refreshTokenKey = `${keyPrefix}.${tokenUserName}.refreshToken`;
  const lastUserKey = `${keyPrefix}.LastAuthUser`;
  const scopeKey = `${keyPrefix}.${tokenUserName}.tokenScopesString`;
  const scopesString = param.oauthScopes.join(' ');
  const userDataKey = `${keyPrefix}.${tokenUserName}.userData`;
  const userData = JSON.stringify({
    UserAttributes: [
      {
        Name: 'sub',
        Value: decodedIdToken['sub'],
      },
      {
        Name: 'email',
        Value: decodedIdToken['email'],
      },
    ],
    Username: tokenUserName,
  });

  // Construct object with the cookies
  const cookies = {
    [idTokenKey]: `${param.tokens.id_token}; ${withCookieDomain(param.domainName, param.cookieSettings.idToken)}`,
    [accessTokenKey]: `${param.tokens.access_token}; ${withCookieDomain(param.domainName, param.cookieSettings.accessToken)}`,
    [refreshTokenKey]: `${param.tokens.refresh_token}; ${withCookieDomain(param.domainName, param.cookieSettings.refreshToken)}`,
    [lastUserKey]: `${tokenUserName}; ${withCookieDomain(param.domainName, param.cookieSettings.idToken)}`,
    [scopeKey]: `${scopesString}; ${withCookieDomain(param.domainName, param.cookieSettings.accessToken)}`,
    [userDataKey]: `${encodeURIComponent(userData)}; ${withCookieDomain(param.domainName, param.cookieSettings.idToken)}`,
    'amplify-signin-with-hostedUI': `true; ${withCookieDomain(param.domainName, param.cookieSettings.accessToken)}`,
  };

  if (param.event === 'signOut') {
    // Expire all cookies
    Object.keys(cookies).forEach((key) => (cookies[key] = expireCookie(cookies[key])));
  } else if (param.event === 'refreshFailed') {
    // Expire refresh token (so the browser will not send it in vain again)
    cookies[refreshTokenKey] = expireCookie(cookies[refreshTokenKey]);
  }

  // Always expire nonce, nonceHmac and pkce - this is valid in all scenario's:
  // * event === 'newTokens' --> you just signed in and used your nonce and pkce successfully, don't need them no more
  // * event === 'refreshFailed' --> you are signed in already, why do you still have a nonce?
  // * event === 'signOut' --> clear ALL cookies anyway
  ['spa-auth-edge-nonce', 'spa-auth-edge-nonce-hmac', 'spa-auth-edge-pkce'].forEach((key) => {
    cookies[key] = expireCookie(cookies[key]);
  });

  // Return cookie object in format of CloudFront headers
  return Object.entries(cookies).map(([k, v]) => ({
    key: 'set-cookie',
    value: `${k}=${v}`,
  }));
}

type Cookies = Record<string, string>;

function extractCookiesFromHeaders(headers: CloudFrontHeaders): Cookies {
  // Cookies are present in the HTTP header "Cookie" that may be present multiple times.
  // This utility function parses occurrences  of that header and splits out all the cookies and their values
  // A simple object is returned that allows easy access by cookie name: e.g. cookies["nonce"]
  if (!headers['cookie']) {
    return {};
  }
  const cookies = headers['cookie'].reduce((reduced, header) => Object.assign(reduced, parse(header.value)), {} as Cookies);

  return cookies;
}

function withCookieDomain(distributionDomainName: string, cookieSettings: string) {
  if (cookieSettings.toLowerCase().indexOf('domain') === -1) {
    // Add leading dot for compatibility with Amplify (or js-cookie really)
    return `${cookieSettings}; Domain=.${distributionDomainName}`;
  }
  return cookieSettings;
}

function expireCookie(cookie = '') {
  const cookieParts = cookie
    .split(';')
    .map((part) => part.trim())
    .filter((part) => !part.toLowerCase().startsWith('max-age'))
    .filter((part) => !part.toLowerCase().startsWith('expires'));
  const expires = `Expires=${new Date(0).toUTCString()}`;
  const [, ...settings] = cookieParts; // first part is the cookie value, which we'll clear
  return ['', ...settings, expires].join('; ');
}
