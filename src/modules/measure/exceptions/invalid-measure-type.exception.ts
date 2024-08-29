import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class InvalidMeasureTypeException extends AppException {

    constructor () {
        super({
            error_code: 'INVALID_TYPE',
            error_message: 'Tipo de medição não  permitida'
        }, HttpStatus.BAD_REQUEST);
    }
}
