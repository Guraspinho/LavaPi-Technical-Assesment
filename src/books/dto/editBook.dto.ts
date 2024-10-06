import { CreateBookDto } from "./createBook.dto";
import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger"

export class EditBookDto extends PartialType(CreateBookDto) // this inherits everything from createBook dto
{
    // Although this class extends CreateBookDto and works for validation, 
    // Swagger requires explicit annotations for documentation purposes.

    // @ApiPropertyOptional({ description: "The title of the book" })
    // title?: string;
  
    // @ApiPropertyOptional({ description: "The author of the book" })
    // author?: string;
  
    // @ApiPropertyOptional({ description: "The publication date of the book", type: String, format: "date" })
    // publishDate?: Date;
} 