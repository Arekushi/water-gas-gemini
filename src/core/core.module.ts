import { Module } from '@nestjs/common';

import { PrismaService } from '@core/services/prisma.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaService
    ],
    exports: [
        PrismaService
    ],
})
export class CoreModule {}
