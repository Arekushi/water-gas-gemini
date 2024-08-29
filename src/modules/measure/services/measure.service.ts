import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { GeminiService } from '@gemini/services/gemini.service';
import { ImageService } from '@image/services/image.service';

import { UploadRequest } from '@measure/domain/requests/upload.request';
import { MEASURE_PROMPT } from '@measure/measure.constants';
import { recoverNumber } from '@measure/helpers/gemini-response.helper';
import { UploadSuccessResponse } from '@measure/domain/responses/upload.response';
import { ConfirmRequest } from '@measure/domain/requests/confirm.request';
import { ConfirmResponse } from '@measure/domain/responses/confirm.response';

import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { CheckMonthMeasureAspect } from '@measure/aspects/check-month-measure.aspect';
import { ValidateMeasureAspect } from '@measure/aspects/validate-measure.aspect';

@Injectable()
export class MeasureService {
    
    constructor(
        public readonly prisma: PrismaService,
        public readonly gemini: GeminiService,
        public readonly imageService: ImageService
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

        const id = uuid.v4();

        const { imageBase64, url } = await this.imageService.saveImage({
            image: image,
            filename: id
        });
        const geminiResponse = await this.measure(imageBase64);

        const measure = await this.prisma.measure.create({
            data: {
                id: id,
                imageUrl: url,
                value: geminiResponse,
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
            imageUrl: measure.imageUrl,
            measureUuid: measure.id,
            measureValue: measure.value
        };
    }

    @UseAspect(Advice.Before, ValidateMeasureAspect)
    async confirm(
        request: ConfirmRequest
    ): Promise<ConfirmResponse> {
        const { confirmedValue, measureUuid } = request;

        const measure = await this.prisma.measure.update({
            where: {
                id: measureUuid
            },
            data: {
                hasConfirmed: true,
                value: confirmedValue
            }
        });

        return {
            success: measure !== undefined
        };
    }

    async measure(
        imageBase64: string
    ): Promise<number> {
        const result = await this.gemini.analyzeImage({
            image: imageBase64,
            prompt: MEASURE_PROMPT
        });

        return recoverNumber(result);
    }
}
