import type { CloudFrontRequestHandler } from 'aws-lambda';
import { getConfig, Config } from '../shared';

type OriginMutationConfig = Config<unknown>;

let CONFIG: OriginMutationConfig;

export const handler: CloudFrontRequestHandler = async (event) => {
  if (!CONFIG) {
    CONFIG = getConfig();
  }

  CONFIG.logger.debug(event);

  const request = event.Records[0].cf.request;
  const uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  CONFIG.logger.debug('Returning request:\n', request);

  return request;
};
