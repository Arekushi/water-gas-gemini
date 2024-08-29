import { ApiProperty } from '@nestjs/swagger';

export class ConfirmResponse {
    @ApiProperty()
    success: boolean;
}
