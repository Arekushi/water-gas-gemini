
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { UploadRequest } from '@measure/domain/requests/upload.request';
import { PrismaService } from '@src/core/services/prisma.service';
import { DoubleReportException } from '@measure/exceptions/double-report.exception';


export class CheckMonthMeasureAspect implements Aspect {

    async execute(ctx: AspectContext): Promise<void> {
        const prisma: PrismaService = ctx.target.prisma;
        const request: UploadRequest = ctx.functionParams.request.value;
        const { measureType, customerCode } = request;
        const measurementDate = new Date(request.measureDatetime)

        const measure = await prisma.measure.findFirst({
            where: {
                customerId: customerCode,
                type: {
                    name: measureType
                },
                measurementDate: {
                    lte: measurementDate,
                    gte: new Date(
                        measurementDate.getFullYear(),
                        measurementDate.getMonth(),
                        1
                    )
                }
            }
        });

        if (measure) {
            throw new DoubleReportException()
        }
    }
}
