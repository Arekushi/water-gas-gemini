import { Content, Part } from '@google/generative-ai';
import { getImageMime } from 'base64-image-mime'

export const createContent = (
    text: string,
    ...images: string[]
): Content[] => {
    const imageParts: Part[] = images.map((image) => {
        return {
            inlineData: {
                mimeType: getImageMime(image),
                data: image,
            },
        };
    });

    return [
        {
            role: 'user',
            parts: [
                ...imageParts,
                {
                    text,
                },
            ],
        },
    ];
};
