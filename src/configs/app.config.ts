import { toBoolean } from 'yaspar';

export interface AppConfig {
    url?: string;
    port?: number;
    globalPrefix?: string;
    swagger?: SwaggerConfig;
}

export interface SwaggerConfig {
    enabled: boolean;
    title: string;
    route: string;
    description: string;
    version: string;
}

const appConfig: AppConfig = {
    globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    port: parseInt(process.env.PORT) || 3000,
    url: process.env.URL || 'http://localhost',
    swagger: {
        enabled: toBoolean(process.env.SWAGGER) || true,
        title: 'Water Gas Gemini API',
        route: 'api',
        description: 'Water and gas consumption reading service',
        version: '1.0'
    }
}

export { appConfig }
