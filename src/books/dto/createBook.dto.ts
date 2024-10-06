import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto
{
    @ApiProperty({ description: "The title of the book" })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: "The author of the book" })
    @IsNotEmpty()
    @IsString()
    author: string;

    @ApiProperty({ description: "The publication date of the boo", type: String, format: "date" })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    publishDate: Date
}