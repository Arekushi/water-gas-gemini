import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { SerializeInterceptor } from 'serialize-interceptor';

import { CoreModule } from '@core/core.module';
import { GeminiModule } from '@gemini/gemini.module';
import { MeasureModule } from '@measure/measure.module';

import { LoggerInterceptor } from '@core/interceptor/logger.interceptor';
import { LoggerExceptionFilter } from '@core/filters/logger.filter';
import { AppExceptionFilter } from '@core/filters/app-exception.filter';


// const env = process.env.NODE_ENV;
// const envFilePath = !env ? '.env' : `.env.${env}`

@Module({
    imports: [
        CoreModule,
        MeasureModule,
        GeminiModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: LoggerExceptionFilter
        },
        {
            provide: APP_FILTER,
            useClass: AppExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: SerializeInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useFactory: (reflector: Reflector) => 
                new ClassSerializerInterceptor(reflector, {
                    excludeExtraneousValues: true,
                    enableCircularCheck: true
                }
            ),
            inject: [Reflector]
        }
    ],
})
export class AppModule {}
