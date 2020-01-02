import { IsOptional, IsNotEmpty } from "class-validator";

export class GetBooksFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
}