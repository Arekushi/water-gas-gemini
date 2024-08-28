import { CoreModule } from '@core/core.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { LoggerInterceptor } from '@core/interceptor/logger.interceptor';
import { LoggerExceptionFilter } from '@core/filters/logger.filter';

const env = process.env.NODE_ENV;
const envFilePath = !env ? '.env' : `.env.${env}`

@Module({
    imports: [
        CoreModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: envFilePath,
        }),
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
