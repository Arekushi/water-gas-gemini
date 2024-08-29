import { MeasureType } from '@measure/enums/measure-type.enum';
import { IsEnum, IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class CreateMeasureRequest {
    @IsNotEmpty()
    @IsEnum(MeasureType)
    type: MeasureType;

    @IsNotEmpty()
    @IsUUID()
    customerId: string;

    @IsNotEmpty()
    @IsUrl()
    imageUrl: string;
}
