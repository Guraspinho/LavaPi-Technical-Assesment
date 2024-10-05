import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { AddBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/editBook.dto';

@Controller('books')
export class BooksController
{
    constructor(private booksService: BooksService) {}

    // adds a book in a database
    @Post("create")
    createBook(@Body(ValidationPipe) bookInfo: AddBookDto)
    {
        return this.booksService.createBook(bookInfo);
    }
    
    // gets every record of a book
    @Get("all")
    listBooks()
    {
        return this.booksService.listBooks();
    }

    // gets a single book based on it's id
    @Get("details/:id")
    getBookDetails(@Param("id", ParseIntPipe) id: number)
    {
        return this.booksService.getBookDetails(id);
    }

    // edits a book based on it's id
    @Patch("edit/:id")
    editBook(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) bookInfo: UpdateBookDto)
    {
        return this.booksService.editBook(id,bookInfo);
    }

    // deletes a book
    @Delete("delete/:id")
    deleteBook(@Param("id",ParseIntPipe) id: number)
    {
        return this.booksService.deleteBook(id);
    }

    // Searches a book based on an Author and a title
    @Get("search")
    searchBook(@Query() query: { title?: string; author?: string })
    {
        return this.booksService.searchBook(query);
    }
}
