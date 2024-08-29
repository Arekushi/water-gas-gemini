import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeImageResponse {
    @ApiProperty()
    text: string
}
