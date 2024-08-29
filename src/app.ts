import * as express from 'express';

import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { setupSwagger } from '@src/swagger';
import { appConfig } from '@configs/app.config';
import { join } from 'path';
import { json } from 'express';


export class App {
    app: INestApplication;

    async init(): Promise<void> {
        this.app = await NestFactory.create(AppModule);
        this.app.setGlobalPrefix(appConfig.globalPrefix);
        this.app.enableCors();
        this.app.enableShutdownHooks();
        this.app.use(json({ limit: '50mb' }));
        this.app.use(
            '/uploads',
            express.static(join(process.cwd(), 'uploads'))
        );
    }

    async listen(): Promise<void> {
        const { port, url, swagger, globalPrefix } = appConfig;
        const messages = [];

        if (swagger.enabled) {
            setupSwagger(this.app, swagger);
            messages.push(`Swagger API on ${url}:${port}/${swagger.route}`);
        }

        await this.app.listen(port, () => {
            messages.push(`Node Express server listening on ${url}:${port}/${globalPrefix}`);
        });

        messages.forEach((message) => Logger.log(message));
    }
}
