import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { GeminiService } from '@gemini/services/gemini.service';

import { CreateMeasureRequest } from '@measure/domain/requests/measure.request';
import { UploadRequest } from '@measure/domain/requests/upload.request';
import { MEASURE_PROMPT } from '@measure/measure.constants';
import { recoverNumber } from '@measure/helpers/gemini-response.helper';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { CheckMonthMeasureAspect } from '@measure/aspects/check-month-measure.aspect';
import { UploadSuccessResponse } from '@measure/domain/responses/upload.response';


@Injectable()
export class MeasureService {
    
    constructor(
        public readonly prisma: PrismaService,
        public readonly gemini: GeminiService
    ) { }


    @UseAspect(Advice.Before, CheckMonthMeasureAspect)
    async register(
        request: UploadRequest
    ): Promise<UploadSuccessResponse> {
        const {
            image,
            customerCode,
            measureDatetime,
            measureType
        } = request;

        const measure = await this.prisma.measure.create({
            data: {
                imageUrl: 'null',
                value: 0,
                measurementDate: measureDatetime,
                type: {
                    connect: {
                        name: measureType
                    }
                },
                customer: {
                    connectOrCreate: {
                        where: {
                            id: customerCode
                        },
                        create: {
                            id: customerCode
                        }
                    }
                }
            }
        });

        return {
            imageUrl: '',
            measureUuid: measure.id,
            measureValue: measure.value
        };
    }

    async measure(
        image: string
    ): Promise<number> {
        const result = await this.gemini.analyzeImage({
            image,
            prompt: MEASURE_PROMPT
        });

        return recoverNumber(result);
    }
}
