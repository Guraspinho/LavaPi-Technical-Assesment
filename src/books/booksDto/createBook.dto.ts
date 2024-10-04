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
    @IsDate()
    publishDate: Date
}