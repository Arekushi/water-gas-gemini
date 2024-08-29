import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { GeminiService } from '@gemini/services/gemini.service';
import { GeminiController } from '@gemini/controllers/gemini.controller';
import { GeminiProModelProvider, GeminiProVisionModelProvider } from '@gemini/gemini.provider';

@Module({
    imports: [
        CoreModule
    ],
    controllers: [
        GeminiController
    ],
    providers: [
        GeminiService,
        GeminiProModelProvider,
        GeminiProVisionModelProvider
    ],
    exports: [
        GeminiService
    ]
})
export class GeminiModule {}
