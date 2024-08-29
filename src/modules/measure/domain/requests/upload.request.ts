import { MeasureType } from '@measure/enums/measure-type.enum'
import { Transform } from 'class-transformer';
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
    @Transform(({ value }) => value.toUpperCase())
    @IsEnum(MeasureType)
    measureType: MeasureType;
}
