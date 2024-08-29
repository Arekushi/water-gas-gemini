import {
    Body,
    Controller,
    Get,
    HttpCode,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBody,
    ApiHeader,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { MeasureService } from '@measure/services/measure.service';
import { UploadRequest } from '@measure/domain/requests/upload.request';
import { UploadSuccessResponse } from '@measure/domain/responses/upload.response';
import { ConfirmRequest } from '@measure/domain/requests/confirm.request';
import { ConfirmResponse } from '@measure/domain/responses/confirm.response';

@ApiTags('Measure')
@Controller('measure')
export class MeasureController {

    constructor(
        private readonly service: MeasureService
    ) { }

    @Post('/upload')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '' })
    @ApiBody({
        type: UploadRequest,
        description: '',
        examples: {
            default: {
                summary: 'Test Body',
                description: 'JSON object just for testing',
                value: {
                    image: '',
                    customerCode: '',
                    measureDatetime: '',
                    measureType: 'WATER'
                } as UploadRequest
            }
        }
    })
    @HttpCode(200)
    async upload(
        @Body() request: UploadRequest
    ): Promise<UploadSuccessResponse> {
        return await this.service.register(request);
    }

    @Patch('/confirm')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '' })
    @ApiBody({
        type: ConfirmRequest,
        description: '',
        examples: {
            default: {
                summary: 'Test Body',
                description: 'JSON object just for testing',
                value: {
                    measureUuid: 'uuid',
                    confirmedValue: 123456
                } as ConfirmRequest
            }
        }
    })
    @HttpCode(200)
    async confirm(
        @Body() request: ConfirmRequest
    ): Promise<ConfirmResponse> {
        return await this.service.confirm(request);
    }
}
