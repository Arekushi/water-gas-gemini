import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class InvalidMeasureTypeException extends AppException {

    constructor () {
        super({
            errorCode: 'INVALID_TYPE',
            errorDescription: 'Tipo de medição não permitida'
        }, HttpStatus.BAD_REQUEST);
    }
}
