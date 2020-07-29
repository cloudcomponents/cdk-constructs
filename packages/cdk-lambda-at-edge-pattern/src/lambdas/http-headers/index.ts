import { CloudFrontHeaders, CloudFrontResponseHandler } from 'aws-lambda';
import { getConfig, Config } from '../shared';

let CONFIG: Config<{
  httpHeaders: Record<string, string>;
}>;

export const handler: CloudFrontResponseHandler = async (event) => {
  if (!CONFIG) {
    CONFIG = getConfig();
  }
  CONFIG.logger.debug(event);
  const response = event.Records[0].cf.response;
  Object.assign(response.headers, asCloudFrontHeaders(CONFIG.httpHeaders));
  CONFIG.logger.debug('Returning response:\n', response);
  return response;
};

function asCloudFrontHeaders(
  headers: Record<string, string>,
): CloudFrontHeaders {
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
