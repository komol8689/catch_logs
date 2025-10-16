import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> | void {
    const contextType = host.getType();

    // 🟢 HTTP kontekst
    if (contextType === 'http') {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();

      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      let errorMessage = 'Internal server error';

      if (exception instanceof HttpException) {
        const response = exception.getResponse();
        if (typeof response === 'string') {
          errorMessage = response;
        } else if (typeof response === 'object' && response !== null) {
          const message = (response as any).message;
          errorMessage = Array.isArray(message)
            ? message.join(', ')
            : message || errorMessage;
        }
      }

      const errorResponse = {
        statusCode: status,
        error: { message: errorMessage },
      };

      if (status === 500) console.error('HTTP Exception:', exception);

      // ❌ return kerak emas (HTTP uchun void)
      res.status(status).json(errorResponse);
      return; // ✅ shunchaki qaytish
    }

    // 🔵 RPC kontekst
    if (contextType === 'rpc') {
      const status = exception.status || 500;
      const message = exception.message || 'Internal server error';

      const errorResponse = {
        statusCode: status,
        error: { message },
      };

      console.error('RPC Exception:', exception);

      // ✅ Microservice uchun Observable qaytadi
      return throwError(() => new RpcException(errorResponse));
    }

    // 🔴 Boshqa holat (fallback)
    console.error('Unknown Exception Context:', exception);
  }
}
