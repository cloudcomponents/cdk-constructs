import { Agent } from 'https';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { Logger } from './logger';

const MAX_RETRIES = 5;

const AXIOS_INSTANCE = axios.create({
  httpsAgent: new Agent({ keepAlive: true }),
});

axiosRetry(AXIOS_INSTANCE, {
  retries: MAX_RETRIES,
  retryCondition: (error) => axiosRetry.isNetworkError(error),
  retryDelay: (retryCount) => (retryCount >= 2 ? 25 * (Math.pow(2, retryCount) + Math.random() * retryCount) : 0),
});

export async function httpPostWithRetry<R>(url: string, data: unknown, config: AxiosRequestConfig, logger: Logger): Promise<AxiosResponse<R>> {
  try {
    return await AXIOS_INSTANCE.post(url, data, config);
  } catch (err) {
    logger.debug(`HTTP POST to ${url} failed.`);
    if (axios.isAxiosError(err)) {
      logger.debug(err.response?.data || err);
    } else {
      logger.debug(err);
    }

    throw err;
  }
}
