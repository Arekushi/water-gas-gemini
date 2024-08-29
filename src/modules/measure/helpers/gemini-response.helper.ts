import { AnalyzeImageResponse } from '@gemini/domain/responses/analyze-image.response';

export const recoverNumber = (
    response: AnalyzeImageResponse
): number => {
    const match = response.text.match(/\[(\d+)\]/);

    if (match) {
        return parseInt(match[1]);
    }

    throw { error: 'a' }
}
