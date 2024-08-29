import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { MeasureType } from '@measure/enums/measure-type.enum';
import { MeasuresNotFoundException } from '@measure/exceptions/measures-not-found.exception';
import { ListMeasuresCustomerResponse } from '@measure/domain/responses/customer.response';

@Injectable()
export class CustomerService {
    
    constructor(
        public readonly prisma: PrismaService
    ) { }

    async listMeasures(
        customerId: string,
        measureType?: MeasureType
    ): Promise<ListMeasuresCustomerResponse> {
        const measures = await this.prisma.measure.findMany({
            where: {
                customerId: customerId,
                type: {
                    name: {
                        equals: measureType
                    }
                }
            },
            include: {
                type: true
            }
        });

        if (!measures || measures.length === 0) {
            throw new MeasuresNotFoundException();
        }

        return {
            customerCode: customerId,
            measures: measures.map((m) => {
                return {
                    measureUuid: m.id,
                    measureDatetime: m.measurementDate.toISOString(),
                    measureType: m.type.name,
                    hasConfirmed: m.hasConfirmed,
                    imageUrl: m.imageUrl,
                }
            })
        };
    }
}
