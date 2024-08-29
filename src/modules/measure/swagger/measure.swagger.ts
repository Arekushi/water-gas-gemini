import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UploadRequest } from '@measure/domain/requests/upload.request';
import { ConfirmRequest } from '@measure/domain/requests/confirm.request';

export const UploadSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a medida lida pela API'
        }),
        ApiResponse({
            status: 200,
            description: 'Operação realizada com sucesso',
            example: {
                image_url: 'https:...',
                measure_value: 123,
                measure_uuid: 'UUID'
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Os dados fornecidos no corpo da requisição são inválidos',
            example: {
                error_code: 'INVALID_DATA',
                error_description: '<descrição do erro>'
            }
        }),
        ApiResponse({
            status: 409,
            description: 'Já existe uma leitura para este tipo no mês atual',
            example: {
                error_code: 'DOUBLE_REPORT',
                error_description: 'Leitura do mês já realizada'
            }
        }),
        ApiBody({
            type: UploadRequest,
            description: 'Corpo JSON necessário para a realização do upload.',
            examples: {
                default: {
                    summary: 'Corpo de Exemplo',
                    description: 'Objeto JSON de exemplo',
                    value: {
                        image: 'base64-image',
                        customerCode: 'UUID',
                        measureDatetime: new Date().toISOString(),
                        measureType: 'WATER'
                    } as UploadRequest
                }
            }
        })
    );
};

export const ConfirmSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Responsável por confirmar ou corrigir o valor lido pelo LLM'
        }),
        ApiResponse({
            status: 200,
            description: 'Operação realizada com sucesso',
            example: {
                success: true
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Os dados fornecidos no corpo da requisição são inválidos',
            example: {
                error_code: 'INVALID_DATA',
                error_description: '<descrição do erro>'
            }
        }),
        ApiResponse({
            status: 409,
            description: 'Leitura já confirmada',
            example: {
                error_code: 'CONFIRMATION_DUPLICATE',
                error_description: 'Leitura do mês já realizada'
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Leitura não encontrada',
            example: {
                error_code: 'MEASURE_NOT_FOUND',
                error_description: 'Leitura do mês já realizada'
            }
        }),
        ApiBody({
            type: ConfirmRequest,
            description: 'Corpo JSON necessário para confirmação de uma medição.',
            examples: {
                default: {
                    summary: 'Corpo de Exemplo',
                    description: 'Objeto JSON de exemplo',
                    value: {
                        measureUuid: 'UUID',
                        confirmedValue: 45679
                    } as ConfirmRequest
                }
            }
        })
    );
}
