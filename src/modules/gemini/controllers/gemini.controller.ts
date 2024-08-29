import {
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GeminiService } from '@gemini/services/gemini.service';
import { AnalyzeImageRequest } from '@gemini/domain/requests/analyze-image.request';
import { AnalyzeImageResponse } from '@gemini/domain/responses/analyze-image.response';
import { AnalyzeImageSwagger } from '@gemini/swagger/gemini.swagger';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {

    constructor(
        private readonly service: GeminiService
    ) { }

    @Post('/analyze-image')
    @UsePipes(ValidationPipe)
    @AnalyzeImageSwagger()
    @HttpCode(200)
    async analyzeImage(
        @Body() request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse> {
        return await this.service.analyzeImage(request);
    }
}
