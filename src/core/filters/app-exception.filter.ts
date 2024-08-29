import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from '@core/exceptions/app.exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    
    catch(
        exception: AppException,
        host: ArgumentsHost
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json(exception.getResponse());
    }
}
