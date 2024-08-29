import { ApiProperty } from '@nestjs/swagger';
import { MeasureResponse } from './measure.response';

export class ListMeasuresCustomerResponse {
    @ApiProperty()
    customerCode: string;

    @ApiProperty()
    measures: MeasureResponse[]
}
