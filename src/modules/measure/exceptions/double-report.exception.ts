import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class DoubleReportException extends AppException {

    constructor () {
        super({
            error_code: 'DOUBLE_REPORT',
            error_message: 'Leitura do mês já  realizada'
        }, HttpStatus.CONFLICT);
    }
}
