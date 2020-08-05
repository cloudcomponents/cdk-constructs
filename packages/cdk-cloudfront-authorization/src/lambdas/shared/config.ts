import { createHmac } from 'crypto';
import type { CloudFrontHeaders } from 'aws-lambda';
import { parse } from 'cookie';
import fs from 'fs-extra';

import { CookieSettings } from './cookie';
import { Logger, LogLevel } from './logger';
import html from './template.html';

export interface HttpHeaders {
  [key: string]: string;
}

interface CommonConfig {
  userPoolId: string;
  clientId: string;
  oauthScopes: string[];
  cognitoAuthDomain: string;
  redirectPathSignIn: string;
  redirectPathSignOut: string;
  redirectPathAuthRefresh: string;
  cookieSettings: CookieSettings;
  clientSecret: string;
  nonceSigningSecret: string;
}

interface ConfigFromDisk extends CommonConfig {
  httpHeaders: HttpHeaders;
  logLevel: keyof typeof LogLevel;
  secretAllowedCharacters?: string;
  pkceLength?: number;
  nonceLength?: number;
  nonceMaxAge?: number;
}

export interface Config extends CommonConfig {
  tokenIssuer: string;
  tokenJwksUri: string;
  cloudFrontHeaders: CloudFrontHeaders;
  logger: Logger;
  secretAllowedCharacters: string;
  pkceLength: number;
  nonceLength: number;
  nonceMaxAge: number;
}

export const getConfig = async (): Promise<Config> => {
  const config = (await fs.readJSON(`${__dirname}/configuration.json`)) as ConfigFromDisk;

  // Derive the issuer and JWKS uri all JWT's will be signed with from the User Pool's ID and region:
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userPoolRegion = /^(\S+?)_\S+$/.exec(config.userPoolId)![1];
  const tokenIssuer = `https://cognito-idp.${userPoolRegion}.amazonaws.com/${config.userPoolId}`;
  const tokenJwksUri = `${tokenIssuer}/.well-known/jwks.json`;

  // Setup logger
  const logger = new Logger(LogLevel[config.logLevel]);

  // Defaults for nonce and PKCE
  const defaults = {
    secretAllowedCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~',
    pkceLength: 43, // Should be between 43 and 128 - per spec
    nonceLength: 16,
    nonceMaxAge: parseInt(parse(config.cookieSettings.nonce.toLowerCase())['max-age']) ?? 60 * 60 * 24,
  };

  return {
    ...defaults,
    ...config,
    tokenIssuer,
    tokenJwksUri,
    cloudFrontHeaders: asCloudFrontHeaders(config.httpHeaders),
    logger,
  };
};

export function asCloudFrontHeaders(headers: HttpHeaders): CloudFrontHeaders {
  return Object.entries(headers).reduce(
    (reduced, [key, value]) =>
      Object.assign(reduced, {
        [key.toLowerCase()]: [
          {
            key,
            value,
          },
        ],
      }),
    {} as CloudFrontHeaders,
  );
}

export function createErrorHtml(props: {
  title: string;
  message: string;
  expandText?: string;
  details?: string;
  linkUri: string;
  linkText: string;
}): string {
  const params = { ...props, region: process.env.AWS_REGION };

  return html.replace(/\${([^}]*)}/g, (_, v: keyof typeof params) => params[v] || '');
}

export const urlSafe = {
  /*
        Functions to translate base64-encoded strings, so they can be used:
        - in URL's without needing additional encoding
        - in OAuth2 PKCE verifier
        - in cookies (to be on the safe side, as = + / are in fact valid characters in cookies)
        stringify:
            use this on a base64-encoded string to translate = + / into replacement characters
        parse:
            use this on a string that was previously urlSafe.stringify'ed to return it to
            its prior pure-base64 form. Note that trailing = are not added, but NodeJS does not care
    */
  stringify: (b64encodedString: string): string => b64encodedString.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'),
  parse: (b64encodedString: string): string => b64encodedString.replace(/-/g, '+').replace(/_/g, '/'),
};

export function sign(stringToSign: string, secret: string, signatureLength: number): string {
  const digest = createHmac('sha256', secret).update(stringToSign).digest('base64').slice(0, signatureLength);
  const signature = urlSafe.stringify(digest);
  return signature;
}

export function timestampInSeconds(): number {
  return (Date.now() / 1000) | 0;
}
