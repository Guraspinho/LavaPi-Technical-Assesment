import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class SearchBookDto
{
    @ApiPropertyOptional({ description: "The title to search for" })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    title?: string;

    @ApiPropertyOptional({ description: "The author to search for" })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    author?: string;
}