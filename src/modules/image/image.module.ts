import { Module } from '@nestjs/common';

import { CoreModule } from '@core/core.module';
import { ImageService } from '@image/services/image.service';

@Module({
    imports: [
        CoreModule
    ],
    controllers: [],
    providers: [
        ImageService,
    ],
    exports: [
        ImageService
    ]
})
export class ImageModule {}
