import {
    Body,
    Controller,
    HttpCode,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MeasureService } from '@measure/services/measure.service';
import { UploadRequest } from '@measure/domain/requests/upload.request';
import { UploadSuccessResponse } from '@measure/domain/responses/upload.response';
import { ConfirmRequest } from '@measure/domain/requests/confirm.request';
import { ConfirmResponse } from '@measure/domain/responses/confirm.response';
import { ConfirmSwagger, UploadSwagger } from '@measure/swagger/measure.swagger';

@ApiTags('Measure')
@Controller('measure')
export class MeasureController {

    constructor(
        private readonly service: MeasureService
    ) { }

    @Post('/upload')
    @UsePipes(ValidationPipe)
    @UploadSwagger()
    @HttpCode(200)
    async upload(
        @Body() request: UploadRequest
    ): Promise<UploadSuccessResponse> {
        return await this.service.register(request);
    }

    @Patch('/confirm')
    @UsePipes(ValidationPipe)
    @ConfirmSwagger()
    @HttpCode(200)
    async confirm(
        @Body() request: ConfirmRequest
    ): Promise<ConfirmResponse> {
        return await this.service.confirm(request);
    }
}
