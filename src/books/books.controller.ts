import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { AddBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/editBook.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractId } from 'src/auth/decorators/user.decorator';
import { SearchBookDto } from './dto/searchBook.dto';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController
{
    constructor(private booksService: BooksService) {}

    // adds a book in a database
    @Post("create")
    createBook(@Body(ValidationPipe) bookInfo: AddBookDto, @ExtractId() userId: number)
    {
        return this.booksService.createBook(bookInfo, userId);
    }
    
    // gets every record of a book
    @Get("all")
    listBooks(@ExtractId() userId: number)
    {
        return this.booksService.listBooks(userId);
    }

    // gets a single book based on it's id
    @Get("details/:id")
    getBookDetails(@Param("id", ParseIntPipe) id: number, @ExtractId() userId: number)
    {
        return this.booksService.getBookDetails(id, userId);
    }

    // edits a book based on it's id
    @Patch("edit/:id")
    editBook(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) bookInfo: UpdateBookDto, @ExtractId() userId: number)
    {
        return this.booksService.editBook(id,bookInfo, userId);
    }

    // deletes a book
    @Delete("delete/:id")
    deleteBook(@Param("id",ParseIntPipe) id: number, @ExtractId() userId: number)
    {
        return this.booksService.deleteBook(id, userId);
    }

    // Searches a book based on an Author and a title
    @Get("search")
    searchBook(@Query() query: SearchBookDto ,@ExtractId() userId: number)
    {
        return this.booksService.searchBook(query, userId);
    }
}
