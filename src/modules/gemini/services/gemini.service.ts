import { Inject, Injectable } from '@nestjs/common';

import { GenerativeModel } from '@google/generative-ai';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from '@gemini/gemini.constants';
import { createContent } from '@gemini/helpers/content.helper';
import { AnalyzeImageRequest } from '@gemini/domain/requests/analyze-image.request';
import { AnalyzeImageResponse } from '@gemini/domain/responses/analyze-image.response';

@Injectable()
export class GeminiService {
    
    constructor(
        @Inject(GEMINI_PRO_MODEL) private readonly proModel: GenerativeModel,
        @Inject(GEMINI_PRO_VISION_MODEL) private readonly proVisionModel: GenerativeModel,
    ) { }

    async analyzeImage(
        request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse> {
        const contents = createContent(request.prompt, request.image)
        const result = await this.proVisionModel.generateContent({ contents });
        const response = await result.response;

        return {
            text: response.text()
        };
    }
}
