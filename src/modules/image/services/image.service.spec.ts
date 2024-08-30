import * as fs from 'fs';

import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '@image/services/image.service';

import { InvalidDataException } from '@core/exceptions/invalid-data.exception';

const getBase64Image = (imagePath: string) => {
    const imageData = fs.readFileSync(imagePath);
    return imageData.toString('base64');
};

const REQUESTS = {
    saveImageRequest: {
        ok: {
            image: getBase64Image('./assets/gas/04.png'),
            filename: 'test'
        },
        invalid: {
            image: undefined,
            filename: undefined
        }
    }
}

const RESPONSES = {
    saveImagerResponse: {
        ok: {
            imageBase64: getBase64Image('./assets/gas/04-rezised.png'),
            filename: `test.png`,
            url: 'URL',
            filePath: 'FILE_PATH'
        },
    }
}

const EXCEPTIONS = {
    invalidData: new InvalidDataException([])
}

describe('ImageService', () => {
    let imageService: ImageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ImageService
            ]
        }).compile();

        imageService = module.get<ImageService>(ImageService);
    });

    describe('saveImage', () => {
        it('should return an image response', async () => {
            // Act
            const result = await imageService.saveImage(REQUESTS.saveImageRequest.ok)
            const { filename, imageBase64 } = RESPONSES.saveImagerResponse.ok;

            // Assert
            expect(result).toEqual(
                expect.objectContaining({
                    imageBase64,
                    filename
                })
            );
        });

        it('invalid data exception', async () => {
            // Assert
            await expect(imageService.saveImage(REQUESTS.saveImageRequest.invalid))
                .rejects
                .toThrow(EXCEPTIONS.invalidData);
        });
    });
});
