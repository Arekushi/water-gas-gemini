import { MeasureController } from './constrollers/measure.controller';
import { Module, ValidationPipe } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { MeasureService } from '@measure/services/measure.service';
import { APP_PIPE } from '@nestjs/core';
import { InvalidDataException } from '@core/exceptions/invalid-data.exception';

@Module({
    imports: [
        CoreModule
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
