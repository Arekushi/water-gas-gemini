import { IsInt, IsNotEmpty, IsUUID } from 'class-validator'

export class ConfirmRequest {
    @IsNotEmpty()
    @IsUUID()
    measureUuid: string;

    @IsNotEmpty()
    @IsInt()
    confirmedValue: number;
}
