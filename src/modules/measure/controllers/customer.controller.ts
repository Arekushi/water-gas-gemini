import {
    Controller,
    Get,
    HttpCode,
    Param,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomerService } from '@measure/services/customer.service';
import { MeasureQueryRequest } from '@measure/domain/requests/customer.request';
import { ListMeasuresCustomerResponse } from '@measure/domain/responses/customer.response';
import { ListMeasuresSwagger } from '@measure/swagger/customer.swagger';

@ApiTags('Customer')
@Controller()
export class CustomerController {

    constructor(
        private readonly service: CustomerService
    ) { }

    @Get('/:customerId/list')
    @UsePipes(ValidationPipe)
    @ListMeasuresSwagger()
    @HttpCode(200)
    async listMeasures(
        @Param('customerId') customerId: string,
        @Query() query?: MeasureQueryRequest,
    ): Promise<ListMeasuresCustomerResponse> {
        return await this.service.listMeasures(customerId, query.measure_type);
    }
}
