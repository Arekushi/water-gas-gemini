import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

import { SaveImageRequest } from '@image/domain/requests/image.request';
import { SaveImageResponse } from '@image/domain/responses/image.response';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { RequestImageNormalizerAspect } from '@image/aspects/request-image-normalizer.aspect';
import { appConfig } from '@configs/app.config';

@Injectable()
export class ImageService {

    @UseAspect(Advice.Before, RequestImageNormalizerAspect)
    async saveImage(
        request: SaveImageRequest
    ): Promise<SaveImageResponse> {
        const { image, filename } = request;

        if (typeof image === 'string') {
            const imgBuffer = Buffer.from(image, 'base64');
            const outputDir = path.join(process.cwd(), 'uploads');
            const filePath = path.join(outputDir, filename);
            const compressedImageBuffer = await sharp(imgBuffer)
                .webp({ quality: 75 })
                .toBuffer();
            
            fs.writeFileSync(filePath, compressedImageBuffer);

            return {
                filename: filename,
                filePath: filePath,
                url: `${appConfig.url}:${appConfig.port}/uploads/${filename}`,
                imageBase64: compressedImageBuffer.toString('base64')
            };
        }
    }
}
