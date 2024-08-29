import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Query,
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

import { CustomerService } from '@measure/services/customer.service';
import { MeasureQueryRequest } from '@measure/domain/requests/customer.request';
import { ListMeasuresCustomerResponse } from '@measure/domain/responses/customer.response';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {

    constructor(
        private readonly service: CustomerService
    ) { }

    @Get('/:customerId/list')
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    async listMeasures(
        @Param('customerId') customerId: string,
        @Query() query?: MeasureQueryRequest
    ): Promise<ListMeasuresCustomerResponse> {
        return await this.service.listMeasures(customerId, query.measure_type);
    }
}
