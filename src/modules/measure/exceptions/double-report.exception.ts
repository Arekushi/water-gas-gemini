import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class DoubleReportException extends AppException {

    constructor () {
        super({
            errorCode: 'DOUBLE_REPORT',
            errorDescription: 'Leitura do mês já realizada'
        }, HttpStatus.CONFLICT);
    }
}
