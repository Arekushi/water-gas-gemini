import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { CoreModule } from '@core/core.module';
import { GeminiModule } from '@gemini/gemini.module';
import { ImageModule } from '@image/image.module';

import { InvalidDataException } from '@core/exceptions/invalid-data.exception';

import { MeasureController } from '@measure/controllers/measure.controller';
import { CustomerController } from '@measure/controllers/customer.controller';

import { MeasureService } from '@measure/services/measure.service';
import { CustomerService } from '@measure/services/customer.service';

@Module({
    imports: [
        CoreModule,
        GeminiModule,
        ImageModule
    ],
    controllers: [
        MeasureController,
        CustomerController
    ],
    providers: [
        MeasureService,
        CustomerService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
                exceptionFactory: (errors) => {
                    for (const error of errors) {
                        if (!error.contexts) {
                            continue;
                        }
                                                
                        for (const context of Object.values(error.contexts)) {
                            if (context.exception) {
                                return new context.exception()
                            }
                        }
                    }

                    return new InvalidDataException(errors);
                }
            })
        }
    ],
})
export class MeasureModule {}
