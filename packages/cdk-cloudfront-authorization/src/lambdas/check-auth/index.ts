import { createHash, randomBytes } from 'crypto';
import { stringify as stringifyQueryString } from 'querystring';
import type { CloudFrontRequestEvent, CloudFrontRequestResult, CloudFrontResponseResult } from 'aws-lambda';
import { Config, getConfig, urlSafe, sign, timestampInSeconds } from '../shared/config';
import { extractAndParseCookies } from '../shared/cookie';
import { decodeIdToken, validate } from '../shared/jwt';

let CONFIG: Config;

export const handler = async (event: CloudFrontRequestEvent): Promise<CloudFrontResponseResult | CloudFrontRequestResult> => {
  if (!CONFIG) {
    CONFIG = await getConfig();
  }

  CONFIG.logger.debug(event);

  const request = event.Records[0].cf.request;
  const domainName = request.headers['host'][0].value;
  const requestedUri = `${request.uri}${request.querystring ? '?' + request.querystring : ''}`;

  try {
    const { idToken, refreshToken, nonce, nonceHmac } = extractAndParseCookies(request.headers, CONFIG.clientId);

    CONFIG.logger.debug('Extracted cookies:\n', {
      idToken,
      refreshToken,
      nonce,
      nonceHmac,
    });

    // If there's no ID token in your cookies then you are not signed in yet
    if (!idToken) {
      throw new Error('No ID token present in cookies');
    }

    // If the ID token has expired or expires in less than 10 minutes and there is a refreshToken: refresh tokens
    // This is done by redirecting the user to the refresh endpoint
    // After the tokens are refreshed the user is redirected back here (probably without even noticing this double redirect)
    const { exp } = decodeIdToken(idToken);

    CONFIG.logger.debug('ID token exp:', exp, new Date(exp * 1000).toISOString());
    if (Date.now() / 1000 > exp - 60 * 10 && refreshToken) {
      CONFIG.logger.info('Will redirect to refresh endpoint for refreshing tokens using refresh token');

      const nonce = generateNonce();

      const response: CloudFrontResponseResult = {
        status: '307',
        statusDescription: 'Temporary Redirect',
        headers: {
          location: [
            {
              key: 'location',
              value: `https://${domainName}${CONFIG.redirectPathAuthRefresh}?${stringifyQueryString({ requestedUri, nonce })}`,
            },
          ],
          'set-cookie': [
            {
              key: 'set-cookie',
              value: `spa-auth-edge-nonce=${encodeURIComponent(nonce)}; ${CONFIG.cookieSettings.nonce}`,
            },
            {
              key: 'set-cookie',
              value: `spa-auth-edge-nonce-hmac=${encodeURIComponent(sign(nonce, CONFIG.nonceSigningSecret, CONFIG.nonceLength))}; ${
                CONFIG.cookieSettings.nonce
              }`,
            },
          ],
          ...CONFIG.cloudFrontHeaders,
        },
      };

      CONFIG.logger.debug('Returning response:\n', response);

      return response;
    }

    // Check that the ID token is valid. This throws an error if it's not
    CONFIG.logger.info('Validating JWT ...');
    await validate(idToken, CONFIG.tokenJwksUri, CONFIG.tokenIssuer, CONFIG.clientId);

    CONFIG.logger.info('JWT is valid');

    // Return the request unaltered to allow access to the resource:
    CONFIG.logger.debug('Returning request:\n', request);

    return request;
  } catch (err) {
    CONFIG.logger.info(`Will redirect to Cognito for sign-in because: ${err}`);

    // Reuse existing state if possible, to be more lenient to users doing parallel sign-in's
    // Users being users, may open the sign-in page in one browser tab, do something else,
    // open the sign-in page in another tab, do something else, come back to the first tab and complete the sign-in (etc.)
    const nonce = generateNonce();
    const state = {
      nonce,
      nonceHmac: sign(nonce, CONFIG.nonceSigningSecret, CONFIG.nonceLength),
      ...generatePkceVerifier(),
    };

    CONFIG.logger.debug('Using new state\n', state);

    // Encode the state variable as base64 to avoid a bug in Cognito hosted UI when using multiple identity providers
    // Cognito decodes the URL, causing a malformed link due to the JSON string, and results in an empty 400 response from Cognito.
    const loginQueryString = stringifyQueryString({
      redirect_uri: `https://${domainName}${CONFIG.redirectPathSignIn}`,
      response_type: 'code',
      client_id: CONFIG.clientId,
      state: urlSafe.stringify(Buffer.from(JSON.stringify({ nonce: state.nonce, requestedUri })).toString('base64')),
      scope: CONFIG.oauthScopes.join(' '),
      code_challenge_method: 'S256',
      code_challenge: state.pkceHash,
    });

    // Return redirect to Cognito Hosted UI for sign-in
    const response: CloudFrontResponseResult = {
      status: '307',
      statusDescription: 'Temporary Redirect',
      headers: {
        location: [
          {
            key: 'location',
            value: `https://${CONFIG.cognitoAuthDomain}/oauth2/authorize?${loginQueryString}`,
          },
        ],
        'set-cookie': [
          {
            key: 'set-cookie',
            value: `spa-auth-edge-nonce=${encodeURIComponent(state.nonce)}; ${CONFIG.cookieSettings.nonce}`,
          },
          {
            key: 'set-cookie',
            value: `spa-auth-edge-nonce-hmac=${encodeURIComponent(state.nonceHmac)}; ${CONFIG.cookieSettings.nonce}`,
          },
          {
            key: 'set-cookie',
            value: `spa-auth-edge-pkce=${encodeURIComponent(state.pkce)}; ${CONFIG.cookieSettings.nonce}`,
          },
        ],
        ...CONFIG.cloudFrontHeaders,
      },
    };

    CONFIG.logger.debug('Returning response:\n', response);

    return response;
  }
};

const generatePkceVerifier = (pkce?: string): { pkce: string; pkceHash: string } => {
  if (!pkce) {
    pkce = [...new Array(CONFIG.pkceLength)].map(() => randomChoiceFromIndexable(CONFIG.secretAllowedCharacters)).join('');
  }

  const verifier = {
    pkce,
    pkceHash: urlSafe.stringify(createHash('sha256').update(pkce, 'utf8').digest('base64')),
  };

  CONFIG.logger.debug('Generated PKCE verifier:\n', verifier);

  return verifier;
};

const generateNonce = (): string => {
  const randomString = [...new Array(CONFIG.nonceLength)].map(() => randomChoiceFromIndexable(CONFIG.secretAllowedCharacters)).join('');
  const nonce = `${timestampInSeconds()}T${randomString}`;
  CONFIG.logger.debug('Generated new nonce:', nonce);
  return nonce;
};

const randomChoiceFromIndexable = (indexable: string): string => {
  if (indexable.length > 256) {
    throw new Error(`indexable is too large: ${indexable.length}`);
  }

  const chunks = Math.floor(256 / indexable.length);

  const firstBiassedIndex = indexable.length * chunks;

  let randomNumber: number;

  do {
    randomNumber = randomBytes(1)[0];
  } while (randomNumber >= firstBiassedIndex);

  const index = randomNumber % indexable.length;

  return indexable[index];
};
