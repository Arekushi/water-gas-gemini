import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveImageRequest {
    @IsNotEmpty()
    image: string | Express.Multer.File;

    @IsOptional()
    @IsString()
    filename?: string;
}
