import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { CoreModule } from '@core/core.module';
import { GeminiModule } from '@gemini/gemini.module';
import { ImageModule } from '@image/image.module';

import { InvalidDataException } from '@core/exceptions/invalid-data.exception';
import { MeasureService } from '@measure/services/measure.service';
import { MeasureController } from '@measure/controllers/measure.controller';

@Module({
    imports: [
        CoreModule,
        GeminiModule,
        ImageModule
    ],
    controllers: [
        MeasureController
    ],
    providers: [
        MeasureService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
                exceptionFactory: (errors) => new InvalidDataException(errors)
            })
        }
    ],
})
export class MeasureModule {}
