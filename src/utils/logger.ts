import { env } from '../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...(meta && { meta }),
    };

    if (this.isDevelopment) {
      const color = {
        debug: '#808080',
        info: '#0066cc',
        warn: '#ff9900',
        error: '#cc0000',
      }[level];

      console.log(
        `%c${timestamp} [${level.toUpperCase()}] ${message}`,
        `color: ${color}`,
        meta || ''
      );
    } else {
      console.log(JSON.stringify(logData));
    }
  }

  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta);
  }
}

export const logger = new Logger();