export enum LogLevel {
  'none' = 0,
  'error' = 10,
  'warn' = 20,
  'info' = 30,
  'debug' = 40,
}

export class Logger {
  constructor(private logLevel: LogLevel) {}

  private jsonify(...args: unknown[]) {
    return args.map((arg: unknown) => {
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
  public info(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.info) {
      console.log(...this.jsonify(args));
    }
  }
  public warn(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.warn) {
      console.warn(...this.jsonify(args));
    }
  }
  public error(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.error) {
      console.error(...this.jsonify(args));
    }
  }
  public debug(...args: unknown[]): void {
    if (this.logLevel >= LogLevel.debug) {
      console.trace(...this.jsonify(args));
    }
  }
}
