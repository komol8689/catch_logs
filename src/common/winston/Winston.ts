import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class WinstonService {
  private readonly logger: winston.Logger;


 constructor() {
   this.logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, status, exception }) => {
      return JSON.stringify(
        {
          timestamp,
          level,
          status,
          exception,
        },
        null,
        2,
      );
    }),
  ),
  
  transports: [
    new winston.transports.File({
      filename: 'logs/app.log',
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
