import { Provider } from '@nestjs/common';

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from './gemini.constants';
import { geminiConfig } from '@configs/gemini.config';


export const GeminiProModelProvider: Provider<GenerativeModel> = {
    provide: GEMINI_PRO_MODEL,
    useFactory: () => {
        const genAI = new GoogleGenerativeAI(geminiConfig.KEY);
        return genAI.getGenerativeModel(
            { model: geminiConfig.PRO_MODEL }
        );
    }
};

export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
    provide: GEMINI_PRO_VISION_MODEL,
    useFactory: () => {
        const genAI = new GoogleGenerativeAI(geminiConfig.KEY);
        return genAI.getGenerativeModel(
            { model: geminiConfig.PRO_VISION_MODEL }
        );
    }
};
