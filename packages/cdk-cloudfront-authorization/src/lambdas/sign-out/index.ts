import { stringify as stringifyQueryString } from 'querystring';
import type { CloudFrontRequestEvent, CloudFrontResponseResult } from 'aws-lambda';
import { Config, getConfig, createErrorHtml } from '../shared/config';
import { extractAndParseCookies, generateCookieHeaders } from '../shared/cookie';

let CONFIG: Config;

export const handler = async (event: CloudFrontRequestEvent): Promise<CloudFrontResponseResult> => {
  if (!CONFIG) {
    CONFIG = getConfig();
  }

  CONFIG.logger.debug(event);

  const request = event.Records[0].cf.request;
  const domainName = request.headers['host'][0].value;
  const { idToken, accessToken, refreshToken } = extractAndParseCookies(request.headers, CONFIG.clientId);

  if (!idToken) {
    const response = {
      body: createErrorHtml({
        title: 'Signed out',
        message: 'You are already signed out',
        linkUri: `https://${domainName}${CONFIG.redirectPathSignOut}`,
        linkText: 'Proceed',
      }),
      status: '200',
      statusDescription: 'OK',
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

    // CloudFront returns directly to the viewer without forwarding the response to the origin
    return response;
  }

  const tokens = {
    id_token: idToken,
    access_token: accessToken ?? '',
    refresh_token: refreshToken ?? '',
  };

  const qs = {
    logout_uri: `https://${domainName}${CONFIG.redirectPathSignOut}`,
    client_id: CONFIG.clientId,
  };

  const response = {
    status: '307',
    statusDescription: 'Temporary Redirect',
    headers: {
      location: [
        {
          key: 'location',
          value: `https://${CONFIG.cognitoAuthDomain}/logout?${stringifyQueryString(qs)}`,
        },
      ],
      'set-cookie': generateCookieHeaders.signOut({
        tokens,
        domainName,
        ...CONFIG,
      }),
      ...CONFIG.cloudFrontHeaders,
    },
  };

  CONFIG.logger.debug('Returning response:\n', response);

  // CloudFront returns directly to the viewer without forwarding the response to the origin
  return response;
};
