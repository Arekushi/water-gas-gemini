import { MeasureType } from '@measure/enums/measure-type.enum';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { InvalidMeasureTypeException } from '@measure/exceptions/invalid-measure-type.exception';

export class MeasureQueryRequest {
    @Transform(({ value }) => value.toUpperCase())
    @IsEnum(
        MeasureType,
        {
            context: { exception: InvalidMeasureTypeException },
        }
    )
    @IsOptional()
    measure_type?: MeasureType
}
