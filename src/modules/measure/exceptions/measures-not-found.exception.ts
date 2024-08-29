import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class MeasuresNotFoundException extends AppException {

    constructor () {
        super({
            errorCode: 'MEASURES_NOT_FOUND',
            errorDescription: 'Nenhuma leitura encontrada'
        }, HttpStatus.NOT_FOUND);
    }
}
