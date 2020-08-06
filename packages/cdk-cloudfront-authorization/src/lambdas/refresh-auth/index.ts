import { parse as parseQueryString, stringify as stringifyQueryString } from 'querystring';
import type { CloudFrontResponseResult, CloudFrontRequestEvent } from 'aws-lambda';
import { Config, getConfig, createErrorHtml } from '../shared/config';
import { extractAndParseCookies, generateCookieHeaders } from '../shared/cookie';
import { httpPostWithRetry } from '../shared/request';

let CONFIG: Config;

export const handler = async (event: CloudFrontRequestEvent): Promise<CloudFrontResponseResult> => {
  if (!CONFIG) {
    CONFIG = await getConfig();
  }

  CONFIG.logger.debug(event);

  const request = event.Records[0].cf.request;
  const domainName = request.headers['host'][0].value;
  let redirectedFromUri = `https://${domainName}`;
  const cognitoTokenEndpoint = `https://${CONFIG.cognitoAuthDomain}/oauth2/token`;

  try {
    const { requestedUri, nonce: currentNonce } = parseQueryString(request.querystring);
    redirectedFromUri += requestedUri || '';
    const { idToken, accessToken, refreshToken, nonce: originalNonce } = extractAndParseCookies(request.headers, CONFIG.clientId);

    validateRefreshRequest(currentNonce, originalNonce, idToken, accessToken, refreshToken);

    const headers: { 'Content-Type': string; Authorization?: string } = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (CONFIG.clientSecret !== '') {
      const encodedSecret = Buffer.from(`${CONFIG.clientId}:${CONFIG.clientSecret}`).toString('base64');
      headers['Authorization'] = `Basic ${encodedSecret}`;
    }

    const tokens = {
      id_token: idToken as string,
      access_token: accessToken as string,
      refresh_token: refreshToken as string,
    };

    let cookieHeadersEventType: keyof typeof generateCookieHeaders;

    try {
      const body = stringifyQueryString({
        grant_type: 'refresh_token',
        client_id: CONFIG.clientId,
        refresh_token: refreshToken,
      });

      const res = await httpPostWithRetry<{ id_token: string; access_token: string }>(cognitoTokenEndpoint, body, { headers }, CONFIG.logger).catch(
        (err) => {
          throw new Error(`Failed to refresh tokens: ${err}`);
        },
      );

      tokens.id_token = res.data.id_token;
      tokens.access_token = res.data.access_token;
      cookieHeadersEventType = 'newTokens';
    } catch (err) {
      cookieHeadersEventType = 'refreshFailed';
    }
    const response = {
      status: '307',
      statusDescription: 'Temporary Redirect',
      headers: {
        location: [
          {
            key: 'location',
            value: redirectedFromUri,
          },
        ],
        'set-cookie': generateCookieHeaders[cookieHeadersEventType]({
          tokens,
          domainName,
          ...CONFIG,
        }),
        ...CONFIG.cloudFrontHeaders,
      },
    };

    CONFIG.logger.debug('Returning response:\n', response);

    return response;
  } catch (err) {
    const response = {
      body: createErrorHtml({
        title: 'Refresh issue',
        message: "We can't refresh your sign-in because of a",
        expandText: 'technical problem',
        details: err.toString(),
        linkUri: redirectedFromUri,
        linkText: 'Try again',
      }),
      status: '200',
      headers: {
        ...CONFIG.cloudFrontHeaders,
        'content-type': [
          {
            key: 'Content-Type',
            value: 'text/html; charset=UTF-8',
          },
        ],
      },
    };

    CONFIG.logger.debug('Returning response:\n', response);

    return response;
  }
};

function validateRefreshRequest(
  currentNonce?: string | string[],
  originalNonce?: string,
  idToken?: string,
  accessToken?: string,
  refreshToken?: string,
) {
  if (!originalNonce) {
    throw new Error("Your browser didn't send the nonce cookie along, but it is required for security (prevent CSRF).");
  } else if (currentNonce !== originalNonce) {
    throw new Error('Nonce mismatch');
  }
  Object.entries({ idToken, accessToken, refreshToken }).forEach(([tokenType, token]) => {
    if (!token) {
      throw new Error(`Missing ${tokenType}`);
    }
  });
}
