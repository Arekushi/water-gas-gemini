import * as uuid from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';

import { CustomerController } from '@measure/controllers/customer.controller';
import { CustomerService } from '@measure/services/customer.service';
import { MeasureType } from '@measure/enums/measure-type.enum';

const UUIDS = Array.from({ length: 5 }, () => uuid.v4());
const DATETIMES = Array.from({ length: 5 }, () => new Date());

const RESPONSES = {
    listMeasures: {
        success: {
            customerCode: UUIDS[0],
            measures: [
                {
                    measureUuid: UUIDS[1],
                    measureDatetime: DATETIMES[0],
                    measureType: MeasureType.GAS,
                    hasConfirmed: false,
                    imageUrl: 'URL',
                },
                {
                    measureUuid: UUIDS[2],
                    measureDatetime: DATETIMES[1],
                    measureType: MeasureType.WATER,
                    hasConfirmed: true,
                    imageUrl: 'URL',
                },
            ],
        }
    }
};

describe('CustomerController', () => {
    let customerController: CustomerController;

    const mockCustomerService = {
        listMeasures: jest.fn().mockResolvedValue(
            RESPONSES.listMeasures.success
        )
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CustomerController
            ],
            providers: [{
                provide: CustomerService,
                useValue: mockCustomerService
            }],
        }).compile();

        customerController = module.get<CustomerController>(CustomerController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(customerController).toBeDefined();
    });

    describe('upload', () => {
        it('should return a list of measures', async () => {
            // Act
            const response = await customerController.listMeasures(
                UUIDS[0]
            );

            // Assert
            expect(response).toEqual(RESPONSES.listMeasures.success);
            expect(mockCustomerService.listMeasures).toHaveBeenCalledTimes(1);
            expect(mockCustomerService.listMeasures).toHaveBeenCalledWith(
                UUIDS[0],
                undefined
            );
        });
    });
});
