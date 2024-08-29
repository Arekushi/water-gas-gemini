import {
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { GeminiService } from '@gemini/services/gemini.service';
import { AnalyzeImageRequest } from '@gemini/domain/requests/analyze-image.request';
import { AnalyzeImageResponse } from '@gemini/domain/responses/analyze-image.response';
import { InvalidDataException } from '@core/exceptions/invalid-data.exception';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {

    constructor(
        private readonly service: GeminiService
    ) { }

    @Post('/analyze-image')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '' })
    @ApiBody({
        type: AnalyzeImageRequest,
        description: '',
        examples: {
            default: {
                summary: 'Test Body',
                description: 'JSON object just for testing',
                value: {
                    image: 'base64-image',
                    prompt: 'Qual a cor da imagem?'
                } as AnalyzeImageRequest
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Image analyzed successfully',
        type: AnalyzeImageResponse,
        example: {
            text: 'A imagem é azul.'
        } as AnalyzeImageResponse
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request. Please ensure that body are filled in correctly.',
        type: InvalidDataException,
        example: {
            error_code: 'INVALID_DATA',
            error_description: 'prompt should not be empty; image must be base64 encoded; image should not be empty'
        }
    })
    @HttpCode(200)
    async analyzeImage(
        @Body() request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse> {
        return await this.service.analyzeImage(request);
    }
}
