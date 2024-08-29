import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class MeasureNotFoundException extends AppException {

    constructor () {
        super({
            error_code: 'MEASURE_NOT_FOUND',
            // no arquivo estava escrito de forma errônea,
            // então decidi mudar para se adequar melhor
            error_message: 'Leitura não encontrada'
        }, HttpStatus.NOT_FOUND);
    }
}
