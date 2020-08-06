import { readFileSync } from 'fs';

import { Logger, LogLevel } from './logger';

type ConfigFromDisk<T> = T & {
  logLevel: keyof typeof LogLevel;
  [key: string]: unknown;
};

export type Config<T> = T & {
  logger: Logger;
};

export function getConfig<T>(): Config<T> {
  const config = JSON.parse(readFileSync('./configuration.json', 'utf-8')) as ConfigFromDisk<T>;

  // Setup logger
  const logger = new Logger(LogLevel[config.logLevel]);

  return {
    ...config,
    logger,
  };
}
