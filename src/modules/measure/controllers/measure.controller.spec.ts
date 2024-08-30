import * as uuid from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';

import { MeasureController } from '@measure/controllers/measure.controller';
import { MeasureService } from '@measure/services/measure.service';
import { MeasureType } from '@measure/enums/measure-type.enum';

const UUIDS = Array.from({ length: 5 }, () => uuid.v4());

const RESPONSES = {
    upload: {
        success: {
            imageUrl: 'https:...',
            measureValue: 123,
            measureUuid: 'UUID'
        }
    },
    confirm: {
        success: {
            success: true
        }
    }
};

const REQUESTS = {
    upload: {
        valid: {
            customerCode: UUIDS[0],
            image: 'base64image',
            measureDatetime: new Date().toISOString(),
            measureType: MeasureType.WATER
        }
    },
    confirm: {
        valid: {
            measureUuid: uuid.v4(),
            confirmedValue: 10
        }
    }
};

describe('MeasureController', () => {
    let measureController: MeasureController;

    const mockMeasureService = {
        register: jest.fn(),
        confirm: jest.fn(),
        measure: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                MeasureController
            ],
            providers: [{
                provide: MeasureService,
                useValue: mockMeasureService
            }],
        }).compile();

        measureController = module.get<MeasureController>(MeasureController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(measureController).toBeDefined();
    });

    describe('upload', () => {
        it('should return a valid response', async () => {
            // Arrange
            jest.spyOn(mockMeasureService, 'register').mockResolvedValueOnce(
                RESPONSES.upload.success
            );

            // Act
            const response = await measureController.upload(
                REQUESTS.upload.valid
            );

            // Assert
            expect(response).toEqual(RESPONSES.upload.success);
            expect(mockMeasureService.register).toHaveBeenCalledTimes(1);
            expect(mockMeasureService.register).toHaveBeenCalledWith(REQUESTS.upload.valid);
        });
    });

    describe('confirm', () => {
        it('should return a valid response', async () => {
            // Arrange
            jest.spyOn(mockMeasureService, 'confirm').mockResolvedValueOnce(
                RESPONSES.confirm.success
            );

            // Act
            const response = await measureController.confirm(
                REQUESTS.confirm.valid
            );

            // Assert
            expect(response).toEqual(RESPONSES.confirm.success);
            expect(mockMeasureService.confirm).toHaveBeenCalledTimes(1);
            expect(mockMeasureService.confirm).toHaveBeenCalledWith(REQUESTS.confirm.valid);
        });
    });
});
