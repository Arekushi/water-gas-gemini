import { ApiProperty } from '@nestjs/swagger'

export class UploadSuccessResponse {
    @ApiProperty()
    imageUrl: string;

    @ApiProperty()
    measureValue: number;

    @ApiProperty()
    measureUuid: string;  
}
