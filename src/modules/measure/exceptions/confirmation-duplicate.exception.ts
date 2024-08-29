import { HttpStatus } from '@nestjs/common';
import { AppException } from '@core/exceptions/app.exception';

export class ConfirmationDuplicateException extends AppException {

    constructor () {
        super({
            errorCode: 'CONFIRMATION_DUPLICATE',
            // a mensagem abaixo é repetida de outro erro
            // porém, *como instruído*, mantive estritamente a mensagem que está no arquivo
            // mas de forma lógica, a mensagem deveria ser outra, como:
            // 'Leitura já foi confirmada'
            errorDescription: 'Leitura do mês já realizada'
        }, HttpStatus.CONFLICT);
    }
}
