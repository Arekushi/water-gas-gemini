
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { PrismaService } from '@src/core/services/prisma.service';
import { ConfirmRequest } from '@measure/domain/requests/confirm.request';
import { MeasureNotFoundException } from '@measure/exceptions/measure-not-found.exception';
import { ConfirmationDuplicateException } from '@measure/exceptions/confirmation-duplicate.exception';


export class ValidateMeasureAspect implements Aspect {

    async execute(ctx: AspectContext): Promise<void> {
        const prisma: PrismaService = ctx.target.prisma;
        const request: ConfirmRequest = ctx.functionParams.request.value;

        const measure = await prisma.measure.findFirst({
            where: {
                id: request.measureUuid
            }
        });

        if (!measure) {
            throw new MeasureNotFoundException();
        }

        if (measure.hasConfirmed) {
            throw new ConfirmationDuplicateException();
        }
    }
}
