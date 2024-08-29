import { GenerationConfig, SafetySetting } from '@google/generative-ai';

export interface GeminiConfig {
    KEY: string;
    PRO_MODEL: string;
    PRO_VISION_MODEL: string;
    GENERATION_CONFIG?: GenerationConfig;
    SAFETY_SETTINGS?: SafetySetting[];
}

const geminiConfig: GeminiConfig = {
    KEY: process.env.GEMINI_API_KEY,
    PRO_MODEL: process.env.GEMINI_PRO_MODEL || 'gemini-pro',
    PRO_VISION_MODEL: process.env.GEMINI_PRO_VISION_MODEL || 'gemini-pro-vision'
}

export { geminiConfig }
