import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    HttpStatus,
    MaxFileSizeValidator,
    ParseFilePipe,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiHeader,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { MeasureService } from '@measure/services/measure.service';
import { UploadRequest } from '../domain/requests/upload.request';
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
                    customer_code: '',
                    measure_datetime: '',
                    measure_type: 'WATER'
                } as UploadRequest
            }
        }
    })
    async upload(
        @Body() request: UploadRequest
    ): Promise<void> {
        console.log(request);
    }

    async confirm(): Promise<void> {}
}
