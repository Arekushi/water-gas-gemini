import { Module } from '@nestjs/common';

import { HttpService } from '@core/services/http.service';
import { RequesterService } from '@core/services/requester.service';
import { PrismaService } from '@core/services/prisma.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        HttpService,
        RequesterService,
        PrismaService
    ],
    exports: [
        RequesterService,
        PrismaService
    ],
})
export class CoreModule {}
