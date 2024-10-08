import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class MeasureNotFoundException extends AppException {

    constructor () {
        super({
            errorCode: 'MEASURE_NOT_FOUND',
            // a mensagem abaixo é repetida de outro erro
            // porém, *como instruído*, mantive estritamente a mensagem que está no arquivo
            // mas de forma lógica, a mensagem deveria ser outra, como:
            // 'Leitura não encontrada'
            errorDescription: 'Leitura do mês já realizada'
        }, HttpStatus.NOT_FOUND);
    }
}
