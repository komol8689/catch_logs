import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class WinstonService {
  private readonly logger: winston.Logger;

  filterOnly = (level: string) =>
    winston.format((info) => {
      return info.level === level ? info : false;
    })();

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return JSON.stringify(
            {
              timestamp,
              level,
              message,
              ...meta, 
            },
            null,
            2,
          );
        }),
      ),
      transports: [
        new winston.transports.File({
          filename: 'logs/info.log',
          level: 'info',
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
      ],
    });
  }

  log(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: Record<string, any>) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }
}