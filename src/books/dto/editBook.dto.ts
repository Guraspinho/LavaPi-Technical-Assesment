import { CreateBookDto } from "./createBook.dto";
import { PartialType } from "@nestjs/mapped-types";


export class EditBookDto extends PartialType(CreateBookDto) {}  // this inherits everything from createBook dto 