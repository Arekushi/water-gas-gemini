import { ApiProperty } from '@nestjs/swagger';

export class MeasureResponse {
    @ApiProperty()
    measureUuid: string;

    @ApiProperty()
    measureDatetime: string;

    @ApiProperty()
    measureType: string;

    @ApiProperty()
    hasConfirmed: boolean;

    @ApiProperty()
    imageUrl: string;
}
