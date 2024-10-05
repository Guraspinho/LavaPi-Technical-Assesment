import { IsOptional, IsString, Length } from 'class-validator';

export class SearchBookDto
{
    @IsOptional()
    @IsString()
    @Length(1, 255)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    author?: string;
}