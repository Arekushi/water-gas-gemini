import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from '@configs/app.config';

export const setupSwagger = (
    app: INestApplication,
    cfg: SwaggerConfig
) => {
    try {
        SwaggerModule.setup(cfg.route, app, createDocument(app, cfg));
    } catch (err) {
        console.log(err);
    }
};

const createDocument = (
    app: INestApplication,
    cfg: SwaggerConfig
) => {
    const documentBuild = new DocumentBuilder()
        .setTitle(cfg.title)
        .setDescription(cfg.description)
        .setVersion(cfg.version)
        .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')
        .build();

    return SwaggerModule.createDocument(app, documentBuild);
};
