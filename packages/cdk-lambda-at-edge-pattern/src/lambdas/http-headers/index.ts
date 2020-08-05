import type { CloudFrontHeaders, CloudFrontResponseHandler } from 'aws-lambda';
import { getConfig, Config } from '../shared';

export type HttpHeadersConfig = Config<{
  httpHeaders: Record<string, string>;
}>;

let CONFIG: HttpHeadersConfig;

export const handler: CloudFrontResponseHandler = async (event) => {
  if (!CONFIG) {
    CONFIG = await getConfig();
  }

  CONFIG.logger.debug(event);

  const response = event.Records[0].cf.response;

  if (!CONFIG.httpHeaders) return response;

  Object.assign(response.headers, asCloudFrontHeaders(CONFIG.httpHeaders));

  CONFIG.logger.debug('Returning response:\n', response);
  return response;
};

function asCloudFrontHeaders(headers: Record<string, string>): CloudFrontHeaders {
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
