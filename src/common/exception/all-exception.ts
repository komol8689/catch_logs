import {
    ArgumentsHost,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Catch,
} from '@nestjs/common';
import { WinstonService } from '../winston/Winston';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: WinstonService) { }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;


        // winston
        this.logger.error('Global error', {
            exception: exception.message,
            status,
        });

        if (status === 500) {
            console.log('Global error: ', exception.message);
        }

        let errorMessage = 'Internal server error';

        if (exception instanceof HttpException) {
            const exceptionResponse: any = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                errorMessage = exceptionResponse;
            } else if (typeof exceptionResponse === 'object') {
                const message = (exceptionResponse as any).message;
                if (Array.isArray(message)) {
                    errorMessage = message.join(', ');
                } else {
                    errorMessage = message || errorMessage;
                }
            }
        }

        const errorResponse = {
            statusCode: status,
            error: {
                message: errorMessage,
            },
        };

        res.status(status).json(errorResponse);
    }
}
