import config from 'config';

import { toBoolean } from 'yaspar';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { setupSwagger, SwaggerConfig } from '@src/swagger';

export interface AppProps {
    url?: string;
    port?: number;
    swagger?: SwaggerConfig;
    globalPrefix?: string;
}

export class App {
    app: INestApplication;
    cfgService: ConfigService;
    props: AppProps;

    constructor() {
        this.props = config.util.toObject(config.get('app'));
    }

    async init(): Promise<void> {
        this.app = await NestFactory.create(AppModule);
        this.app.setGlobalPrefix(this.props.globalPrefix);
        this.app.enableCors();
        this.app.enableShutdownHooks();

        this.cfgService = this.app.get(ConfigService);
        this.props.port = this.cfgService.get('PORT', this.props.port);
    }

    async listen(): Promise<void> {
        const enableSwagger = toBoolean(this.cfgService.get('SWAGGER', 'FALSE'));
        const { port, url, swagger, globalPrefix } = this.props;
        const messages = [];

        if (enableSwagger) {
            setupSwagger(this.app, swagger);
            messages.push(`Swagger API on ${url}:${port}/${swagger.route}`);
        }

        await this.app.listen(port, () => {
            messages.push(`Node Express server listening on ${url}:${port}/${globalPrefix}`);
        });

        messages.forEach((message) => Logger.log(message));
    }
}
