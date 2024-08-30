import * as uuid from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';
import { MeasureType } from '@measure/enums/measure-type.enum';

import { MeasureService } from '@measure/services/measure.service';
import { PrismaService } from '@core/services/prisma.service';
import { GeminiService } from '@gemini/services/gemini.service';
import { ImageService } from '@image/services/image.service';

import { InvalidDataException } from '@core/exceptions/invalid-data.exception';
import { DoubleReportException } from '@measure/exceptions/double-report.exception';
import { MeasureNotFoundException } from '@measure/exceptions/measure-not-found.exception';
import { MeasuresNotFoundException } from '@measure/exceptions/measures-not-found.exception';
import { InvalidMeasureTypeException } from '@measure/exceptions/invalid-measure-type.exception';
import { ConfirmationDuplicateException } from '@measure/exceptions/confirmation-duplicate.exception';

const UUIDS = Array.from({ length: 5 }, () => uuid.v4());

const REQUESTS = {
    uploadRequest: {
        ok: {
            customerCode: UUIDS[0],
            image: 'base64 image',
            measureDatetime: new Date().toISOString(),
            measureType: MeasureType.WATER
        }
    },
    confirmRequest: {
        default: {
            measureUuid: UUIDS[2],
            confirmedValue: 100
        },
    }
}

const RESPONSES = {
    uploadSuccessResponse: {
        default: {
            imageUrl: 'URL',
            measureValue: 20,
            measureUuid: UUIDS[1]
        }
    },
    confirmSuccessResponse: {
        default: {
            success: true
        }
    },
    saveImageResponse: {
        default: {
            imageBase64: 'BASE64',
            url: 'URL',
            filePath: 'FILE_PATH',
            filename: 'FILENAME'
        }
    },
    analyzeImageResponse: {
        default: {
            text: '[20]'
        }
    },
    prismaMeasureCreate: {
        default: {
            id: UUIDS[1],
            value: 20,
            imageUrl: 'URL'
        }
    },
    prismaMeasureFindFirst: {
        founded: {},
        notFounded: undefined,
        confirmed: {
            hasConfirmed: true
        }
    }
}

const EXCEPTIONS = {
    invalidData: new InvalidDataException([]),
    doubleReport: new DoubleReportException(),
    duplicate: new ConfirmationDuplicateException(),
    measureNotFound: new MeasureNotFoundException(),
    measuresNotFound: new MeasuresNotFoundException(),
    invalidMeasureType: new InvalidMeasureTypeException()
}

describe('MeasureService', () => {
    let measureService: MeasureService;

    const mockPrismaService = {
        measure: {
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn()
        }
    };

    const mockGeminiService = {
        analyzeImage: jest.fn()
    };

    const mockImageService = {
        saveImage: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MeasureService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService
                },
                {
                    provide: GeminiService,
                    useValue: mockGeminiService
                },
                {
                    provide: ImageService,
                    useValue: mockImageService
                }
            ]
        }).compile();

        measureService = module.get<MeasureService>(MeasureService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(measureService).toBeDefined();
    });

    describe('register', () => {
        it('should return a response successfully', async () => {
            // Arrange
            jest.spyOn(mockImageService, 'saveImage').mockResolvedValueOnce(
                RESPONSES.saveImageResponse.default
            );
            jest.spyOn(mockGeminiService, 'analyzeImage').mockResolvedValueOnce(
                RESPONSES.analyzeImageResponse.default
            );
            jest.spyOn(mockPrismaService.measure, 'create').mockResolvedValueOnce(
                RESPONSES.prismaMeasureCreate.default
            );

            // Act
            const response = await measureService.register(REQUESTS.uploadRequest.ok);

            // Assert
            expect(response).toEqual(RESPONSES.uploadSuccessResponse.default);
            expect(mockPrismaService.measure.create).toHaveBeenCalledTimes(1);
            expect(mockImageService.saveImage).toHaveBeenCalledTimes(1);
            expect(mockGeminiService.analyzeImage).toHaveBeenCalledTimes(1);
        });

        it('there is already a reading for this type in the current month', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaMeasureFindFirst.founded
            );

            // Assert
            await expect(measureService.register(REQUESTS.uploadRequest.ok))
                .rejects
                .toThrowError(EXCEPTIONS.doubleReport);

            expect(mockPrismaService.measure.create).toHaveBeenCalledTimes(0);
            expect(mockImageService.saveImage).toHaveBeenCalledTimes(0);
            expect(mockGeminiService.analyzeImage).toHaveBeenCalledTimes(0);
        });
    });

    describe('confirm', () => {
        it('should return a response successfully', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaMeasureFindFirst.founded
            );
            jest.spyOn(mockPrismaService.measure, 'update').mockResolvedValueOnce(
                REQUESTS.confirmRequest.default
            );

            // Act
            const response = await measureService.confirm(REQUESTS.confirmRequest.default);

            // Assert
            expect(response).toEqual(RESPONSES.confirmSuccessResponse.default);
            expect(mockPrismaService.measure.update).toHaveBeenCalledTimes(1);
        });

        it('measure not found', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaMeasureFindFirst.notFounded
            );

            // Assert
            await expect(measureService.confirm(REQUESTS.confirmRequest.default))
                .rejects
                .toThrowError(EXCEPTIONS.measureNotFound);
            expect(mockPrismaService.measure.update).toHaveBeenCalledTimes(0);
        });

        it('measure duplicated', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaMeasureFindFirst.confirmed
            );

            // Assert
            await expect(measureService.confirm(REQUESTS.confirmRequest.default))
                .rejects
                .toThrowError(EXCEPTIONS.duplicate);
            expect(mockPrismaService.measure.update).toHaveBeenCalledTimes(0);
        });
    });
});
