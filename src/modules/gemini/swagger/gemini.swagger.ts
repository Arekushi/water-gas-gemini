import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyzeImageRequest } from '@gemini/domain/requests/analyze-image.request';
import { AnalyzeImageResponse } from '@gemini/domain/responses/analyze-image.response';
import { InvalidDataException } from '@core/exceptions/invalid-data.exception';

export const AnalyzeImageSwagger = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Recebe uma imagem e retorna a análise dela baseada em um prompt de texto'
        }),
        ApiBody({
            type: AnalyzeImageRequest,
            description: '',
            examples: {
                default: {
                    summary: 'Corpo de Exemplo',
                    description: 'Objeto JSON de exemplo',
                    value: {
                        image: 'base64-image',
                        prompt: 'Qual a cor da imagem?'
                    } as AnalyzeImageRequest
                }
            }
        }),
        ApiResponse({
            status: 200,
            description: 'Image analyzed successfully',
            type: AnalyzeImageResponse,
            example: {
                text: 'A imagem é azul.'
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request. Please ensure that body are filled in correctly.',
            type: InvalidDataException,
            example: {
                error_code: 'INVALID_DATA',
                error_description: 'prompt should not be empty; image must be base64 encoded; image should not be empty'
            }
        })
    );
};
