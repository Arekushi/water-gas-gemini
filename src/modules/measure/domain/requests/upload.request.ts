import { MeasureType } from '@measure/enums/measure-type.enum'
import { IsBase64, IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class UploadRequest {
    @IsNotEmpty()
    @IsBase64()
    image: string;

    @IsNotEmpty()
    @IsString()
    customerCode: string;

    @IsNotEmpty()
    @IsDateString()
    measureDatetime: string;

    @IsNotEmpty()
    @IsEnum(MeasureType)
    measureType: MeasureType;
}
