import * as uuid from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';
import { MeasureType } from '@measure/enums/measure-type.enum';

import { MeasureService } from '@measure/services/measure.service';
import { PrismaService } from '@core/services/prisma.service';
import { GeminiService } from '@gemini/services/gemini.service';
import { ImageService } from '@image/services/image.service';

import { DoubleReportException } from '@measure/exceptions/double-report.exception';
import { MeasureNotFoundException } from '@measure/exceptions/measure-not-found.exception';
import { ConfirmationDuplicateException } from '@measure/exceptions/confirmation-duplicate.exception';

const UUIDS = Array.from({ length: 5 }, () => uuid.v4());

const EXCEPTIONS = {
    doubleReport: new DoubleReportException(),
    duplicate: new ConfirmationDuplicateException(),
    measureNotFound: new MeasureNotFoundException()
}

const RESPONSES = {
    uploadSuccess: {
        default: {
            imageUrl: 'URL',
            measureValue: 20,
            measureUuid: UUIDS[1]
        }
    },
    confirmSuccess: {
        default: {
            success: true
        }
    },
    prismaCreate: {
        default: {
            id: UUIDS[1],
            imageUrl: 'URL',
            value: 20
        }
    },
    prismaFindFirst: {
        founded: {},
        not_founded: undefined,
        confirmed: {
            hasConfirmed: true
        },
        not_confirmed: {
            hasConfirmed: false
        }
    },
    prismaUpdate: {
        default: {}
    },
    analyzeImage: {
        default: {
            text: '[20]'
        }
    },
    saveImage: {
        default: {
            imageBase64: 'base64image',
            url: 'URL'
        }
    }
};

const REQUESTS = {
    upload: {
        valid: {
            customerCode: UUIDS[0],
            image: 'base64 image',
            measureDatetime: new Date().toISOString(),
            measureType: MeasureType.WATER
        }
    },
    confirm: {
        valid: {
            measureUuid: UUIDS[1],
            confirmedValue: 100
        }
    }
};

describe('MeasureService', () => {
    let measureService: MeasureService;

    const mockPrismaService = {
        measure: {
            findFirst: jest.fn(),
            create: jest.fn().mockResolvedValue(
                RESPONSES.prismaCreate.default
            ),
            update: jest.fn().mockResolvedValue(
                RESPONSES.prismaUpdate.default
            )
        }
    };

    const mockGeminiService = {
        analyzeImage: jest.fn().mockResolvedValue(
            RESPONSES.analyzeImage.default
        )
    };

    const mockImageService = {
        saveImage: jest.fn().mockResolvedValue(
            RESPONSES.saveImage.default
        )
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
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(measureService).toBeDefined();
    });

    describe('register', () => {
        it('should return a response successfully', async () => {
            // Act
            const response = await measureService.register(
                REQUESTS.upload.valid
            );

            // Assert
            expect(response).toEqual(RESPONSES.uploadSuccess.default);
            expect(mockPrismaService.measure.create).toHaveBeenCalledTimes(1);
            expect(mockImageService.saveImage).toHaveBeenCalledTimes(1);
            expect(mockGeminiService.analyzeImage).toHaveBeenCalledTimes(1);
        });

        it('should return DoubleReportException when already has a menasure of this type in current month', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaFindFirst.founded
            );

            // Assert
            await expect(measureService.register(REQUESTS.upload.valid))
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
                RESPONSES.prismaFindFirst.founded
            );

            // Act
            const response = await measureService.confirm(
                REQUESTS.confirm.valid
            );

            // Assert
            expect(response).toEqual(RESPONSES.confirmSuccess.default);
            expect(mockPrismaService.measure.update).toHaveBeenCalledTimes(1);
        });

        it('should return MeasureNotFoundException when measure does not exists', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaFindFirst.not_founded
            );

            // Assert
            await expect(measureService.confirm(REQUESTS.confirm.valid))
                .rejects
                .toThrowError(EXCEPTIONS.measureNotFound);
            expect(mockPrismaService.measure.update).toHaveBeenCalledTimes(0);
        });

        it('should return ConfirmationDuplicateException when measure has already been confirmed', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaFindFirst.confirmed
            );

            // Assert
            await expect(measureService.confirm(REQUESTS.confirm.valid))
                .rejects
                .toThrowError(EXCEPTIONS.duplicate);
            expect(mockPrismaService.measure.update).toHaveBeenCalledTimes(0);
        });

        it('should return a success response even if it finds a measure', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findFirst').mockResolvedValueOnce(
                RESPONSES.prismaFindFirst.not_confirmed
            );

            // Act
            const response = await measureService.confirm(
                REQUESTS.confirm.valid
            );

            // Assert
            expect(response).toEqual(RESPONSES.confirmSuccess.default);
            expect(mockPrismaService.measure.update).toHaveBeenCalledTimes(1);
        });
    });
});
