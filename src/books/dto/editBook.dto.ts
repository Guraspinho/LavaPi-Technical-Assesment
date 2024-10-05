import { AddBookDto } from "./createBook.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateBookDto extends PartialType(AddBookDto) {}