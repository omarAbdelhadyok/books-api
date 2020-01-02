import { IsOptional, IsNotEmpty } from "class-validator";

export class UpdateBookDto {
    
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    author: string;

    @IsOptional()
    @IsNotEmpty()
    image_url: string;
}