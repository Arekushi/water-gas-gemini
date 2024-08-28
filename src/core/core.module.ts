import { Module } from '@nestjs/common';

import { HttpService } from '@core/services/http.service';
import { RequesterService } from '@core/services/requester.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        HttpService,
        RequesterService
    ],
    exports: [
        RequesterService
    ],
})
export class CoreModule {}
