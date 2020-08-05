import fs from 'fs-extra';

import { Logger, LogLevel } from './logger';

type ConfigFromDisk<T> = T & {
  logLevel: keyof typeof LogLevel;
  [key: string]: unknown;
};

export type Config<T> = T & {
  logger: Logger;
};

export async function getConfig<T>(): Promise<Config<T>> {
  const config = (await fs.readJSON(`${__dirname}/configuration.json`)) as ConfigFromDisk<T>;

  // Setup logger
  const logger = new Logger(LogLevel[config.logLevel]);

  return {
    ...config,
    logger,
  };
}
