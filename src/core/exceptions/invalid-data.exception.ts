import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { AppException } from '@core/exceptions/app.exception';

export class InvalidDataException extends AppException {

    constructor (
        errors: ValidationError[],
        message?: string
    ) {
        if (!errors) {
            errors = [];
        }

        const errorMessages = errors.map((error) => {
            return Object.values(error.constraints).join('; ');
        }).join('; ');

        super({
            errorCode: 'INVALID_DATA',
            errorDescription: message || errorMessages
        }, HttpStatus.BAD_REQUEST);
    }
}
