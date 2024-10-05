import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsDate } from "class-validator";

export class AddBookDto
{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    publishDate: Date
}