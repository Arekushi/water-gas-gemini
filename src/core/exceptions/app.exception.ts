import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '@core/domain/response/error.response';

export class AppException extends HttpException {
    constructor(
        error: ErrorResponse,
        status: HttpStatus
    ) {
        super(
            {
                error_code: error.error_code,
                error_description: error.error_message
            },
            status,
        );
    }
}
