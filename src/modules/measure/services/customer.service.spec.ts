import * as uuid from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';
import { MeasureType } from '@measure/enums/measure-type.enum';
import { CustomerService } from '@measure/services/customer.service';
import { MeasuresNotFoundException } from '@measure/exceptions/measures-not-found.exception';
import { PrismaService } from '@src/core/services/prisma.service';

const UUIDS = Array.from({ length: 5 }, () => uuid.v4());
const DATETIMES = Array.from({ length: 5 }, () => new Date());

const RESPONSES = {
    prismaFindMany: {
        default: [
            {
                id: UUIDS[1],
                measurementDate: DATETIMES[0],
                type: { name: 'WATER' },
                hasConfirmed: true,
                imageUrl: 'URL'
            },
            {
                id: UUIDS[2],
                measurementDate: DATETIMES[1],
                type: { name: 'GAS' },
                hasConfirmed: false,
                imageUrl: 'URL'
            }
        ],
        onlyWater: [
            {
                id: UUIDS[1],
                measurementDate: DATETIMES[0],
                type: { name: 'WATER' },
                hasConfirmed: true,
                imageUrl: 'URL'
            },
        ]
    },
    listMeasures: {
        default: {
            customerCode: UUIDS[0],
            measures: [
                {
                    measureUuid: UUIDS[1],
                    measureDatetime: DATETIMES[0].toISOString(),
                    measureType: MeasureType.WATER,
                    hasConfirmed: true,
                    imageUrl: 'URL'
                },
                {
                    measureUuid: UUIDS[2],
                    measureDatetime: DATETIMES[1].toISOString(),
                    measureType: MeasureType.GAS,
                    hasConfirmed: false,
                    imageUrl: 'URL'
                }
            ]
        },
        onlyWater: {
            customerCode: UUIDS[0],
            measures: [
                {
                    measureUuid: UUIDS[1],
                    measureDatetime: DATETIMES[0].toISOString(),
                    measureType: MeasureType.WATER,
                    hasConfirmed: true,
                    imageUrl: 'URL'
                }
            ]
        }
    }
}

const EXCEPTIONS = {
    measuresNotFound: new MeasuresNotFoundException()
}

describe('CustomerService', () => {
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(customerService).toBeDefined();
    });

    describe('listMeasures', () => {
        it('should list all measures of a client', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findMany').mockResolvedValueOnce(
                RESPONSES.prismaFindMany.default
            );

            // Act
            const response = await customerService.listMeasures(
                UUIDS[0]
            );

            // Assert
            expect(response).toEqual(RESPONSES.listMeasures.default);
            expect(mockPrismaService.measure.findMany).toHaveBeenCalledTimes(1);
        });

        it('should list all measures of a type', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findMany').mockResolvedValueOnce(
                RESPONSES.prismaFindMany.onlyWater
            );

            // Act
            const response = await customerService.listMeasures(
                UUIDS[0], MeasureType.WATER
            );

            // Assert
            expect(response).toEqual(RESPONSES.listMeasures.onlyWater);
            expect(mockPrismaService.measure.findMany).toHaveBeenCalledTimes(1);
        });

        it('should return MeasuresNotFoundException when no measures were found', async () => {
            // Arrange
            jest.spyOn(mockPrismaService.measure, 'findMany').mockResolvedValueOnce(
                undefined
            );

            // Assert
            await expect(customerService.listMeasures(UUIDS[0]))
                .rejects
                .toThrowError(EXCEPTIONS.measuresNotFound);
            expect(mockPrismaService.measure.findMany).toHaveBeenCalledTimes(1);
        });
    });
});
