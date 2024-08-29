import { MeasureType } from '@measure/enums/measure-type.enum'
import { IsBase64, IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class UploadRequest {
    @IsNotEmpty()
    @IsBase64()
    image: string

    @IsNotEmpty()
    @IsString()
    customer_code: string

    @IsNotEmpty()
    @IsDateString()
    measure_datetime: string

    @IsNotEmpty()
    @IsEnum(MeasureType)
    measure_type: MeasureType
}
