import * as uuid from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';
import { MeasureType } from '@measure/enums/measure-type.enum';
import { CustomerService } from '@measure/services/customer.service';
import { InvalidMeasureTypeException } from '@measure/exceptions/invalid-measure-type.exception';
import { MeasuresNotFoundException } from '@measure/exceptions/measures-not-found.exception';
import { PrismaService } from '@src/core/services/prisma.service';

const UUIDS = Array.from({ length: 5 }, () => uuid.v4());

const RESPONSES = {
    measuresPrismaResponse: {
        default: [
            {
                id: UUIDS[1],
                measurementDate: new Date(),
                type: { name: 'WATER' },
                hasConfirmed: true,
                imageUrl: 'URL'
            },
            {
                id: UUIDS[2],
                measurementDate: new Date(),
                type: { name: 'GAS' },
                hasConfirmed: false,
                imageUrl: 'URL'
            }
        ],
        only_water: [
            {
                id: UUIDS[1],
                measurementDate: new Date(),
                type: { name: 'WATER' },
                hasConfirmed: true,
                imageUrl: 'URL'
            }
        ]
    },
    measuresResponse: {
        default: {
            customerCode: UUIDS[0],
            measures: [
                {
                    measureUuid: UUIDS[1],
                    measureDatetime: new Date().toISOString(),
                    measureType: MeasureType.WATER,
                    hasConfirmed: true,
                    imageUrl: 'URL'
                },
                {
                    measureUuid: UUIDS[2],
                    measureDatetime: new Date().toISOString(),
                    measureType: MeasureType.GAS,
                    hasConfirmed: false,
                    imageUrl: 'URL'
                }
            ]
        },
        only_water: {
            customerCode: UUIDS[0],
            measures: [
                {
                    measureUuid: UUIDS[1],
                    measureDatetime: new Date().toISOString(),
                    measureType: MeasureType.WATER,
                    hasConfirmed: true,
                    imageUrl: 'URL'
                }
            ]
        }
    }
}

const EXCEPTIONS = {
    invalidType: new InvalidMeasureTypeException(),
    measuresNotFound: new MeasuresNotFoundException()
}

describe('MeasureService', () => {
    let customerService: CustomerService;

    const mockPrismaService = {
        measure: {
            findMany: jest.fn()
        }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CustomerService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService
                }
            ]
        }).compile();

        customerService = module.get<CustomerService>(CustomerService);
    });

    it('should be defined', () => {
        expect(customerService).toBeDefined();
    });

    describe('listMeasures', () => {
        it('should list all of a clients measures', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findMany').mockResolvedValueOnce(
                RESPONSES.measuresPrismaResponse.default
            );

            // Act
            const result = await customerService.listMeasures(UUIDS[0], undefined)

            // Assert
            expect(result).toEqual(RESPONSES.measuresResponse.default);
        });

        it('should throw an exception that no measurements were found', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findMany').mockResolvedValueOnce(
                RESPONSES.measuresPrismaResponse.only_water
            );

            // Act
            const result = await customerService.listMeasures(UUIDS[0], undefined)

            // Assert
            expect(result).toEqual(RESPONSES.measuresResponse.only_water)
        });
    });
});
