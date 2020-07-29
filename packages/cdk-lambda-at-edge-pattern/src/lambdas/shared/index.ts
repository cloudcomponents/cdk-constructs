import { readFileSync } from 'fs';

enum LogLevel {
  'none' = 0,
  'error' = 10,
  'warn' = 20,
  'info' = 30,
  'debug' = 40,
}

class Logger {
  constructor(private logLevel: LogLevel) {}

  private jsonify(...args: unknown[]) {
    return args.map((arg: unknown[]) => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch {
          return arg;
        }
      }
      return arg;
    });
  }
  public info(...args: unknown[]) {
    if (this.logLevel >= LogLevel.info) {
      console.log(...this.jsonify(args));
    }
  }
  public warn(...args: unknown[]) {
    if (this.logLevel >= LogLevel.warn) {
      console.warn(...this.jsonify(args));
    }
  }
  public error(...args: unknown[]) {
    if (this.logLevel >= LogLevel.error) {
      console.error(...this.jsonify(args));
    }
  }
  public debug(...args: unknown[]) {
    if (this.logLevel >= LogLevel.debug) {
      console.trace(...this.jsonify(args));
    }
  }
}

type ConfigFromDisk<T> = T & {
  logLevel: keyof typeof LogLevel;
};

export type Config<T> = ConfigFromDisk<T> & {
  logger: Logger;
  [key: string]: unknown;
};

export function getConfig<T>(): Config<T> {
  const config = JSON.parse(
    readFileSync(`${__dirname}/configuration.json`).toString('utf8'),
  ) as ConfigFromDisk<T>;

  // Setup logger
  const logger = new Logger(LogLevel[config.logLevel]);

  return {
    ...config,
    logger,
  };
}
