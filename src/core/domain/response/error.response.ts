import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
    @ApiProperty()
    error_code: string

    @ApiProperty()
    error_message: string
}
