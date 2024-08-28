import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class LoggerExceptionFilter
    extends BaseExceptionFilter {

    catch(
        exception: any,
        host: ArgumentsHost
    ) {
        Logger.error(exception.message, exception.stack);
        super.catch(exception, host);
    }
}
