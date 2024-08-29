import { IsInt, IsNotEmpty, IsUUID } from 'class-validator'

export class ConfirmRequest {
    @IsNotEmpty()
    @IsUUID()
    measure_uuid: string

    @IsNotEmpty()
    @IsInt()
    confirmed_value: number
}
