import { IsBase64, IsNotEmpty } from 'class-validator';

export class AnalyzeImageRequest {
    @IsNotEmpty()
    prompt: string;

    @IsNotEmpty()
    @IsBase64()
    image: string;
}
