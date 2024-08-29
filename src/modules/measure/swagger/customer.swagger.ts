import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const ListMeasuresSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Responsável por listar as medidas realizadas por um determinado cliente'
        }),
        ApiResponse({
            status: 200,
            description: 'Operação realizada com sucesso',
            example: {
                customer_code: 'string',
                measures: [
                    {
                        measure_uuid: 'string',
                        measure_datetime: 'datetime',
                        measure_type: 'string',
                        has_confirmed: 'boolean',
                        image_url: 'string',
                    },
                    {
                        measure_uuid: 'string',
                        measure_datetime: 'datetime',
                        measure_type: 'string',
                        has_confirmed: 'boolean',
                        image_url: 'string',
                    },
                ],
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Parâmetro measure_type diferente de WATER ou GAS',
            example: {
                error_code: 'INVALID_TYPE',
                error_description: 'Tipo de medição não permitida',
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Nenhum registro encontrado',
            example: {
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhuma leitura encontrada',
            },
        }),
        ApiQuery({
            name: 'measure_type',
            required: false,
            type: 'string',
            description: 'Tipo de medida (WATER ou GAS)'
        }),
        ApiParam({
            name: 'customerId',
            required: true,
            type: 'string',
            description: 'Identificador único do cliente'
        })
    );
};
