import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UploadSuccessResponse {
    @ApiProperty()
    @Expose()
    image_url: string

    @ApiProperty()
    @Expose()
    measure_value: string

    @ApiProperty()
    @Expose()
    measure_uuid: string    
}
