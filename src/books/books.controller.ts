import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { EditBookDto } from './dto/editBook.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractId } from 'src/auth/decorators/user.decorator';
import { SearchBookDto } from './dto/searchBook.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';


@Controller("books")
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth("access-token") // Indicates that this controller requires a bearer token
export class BooksController
{
    constructor(private booksService: BooksService) {}

    // adds a book in a database
    @Post("create")
    @ApiResponse({ status: 201, description: "Book created successfully." })
    @ApiResponse({ status: 500, description: "Failed to add a book. Please try again later." }) // Server error response
    createBook(@Body(ValidationPipe) bookInfo: CreateBookDto, @ExtractId() userId: number)
    {
        return this.booksService.createBook(bookInfo, userId);
    }
    
    // gets every record of a book
    @Get("all")
    @ApiResponse({ status: 200, description: "Returns a list of books with pagination (10 books per page)" })
    @ApiResponse({ status: 404, description: "Unfortunately, you do not have any books :(" }) // Not Found response
    @ApiResponse({ status: 500, description: "Failed to retrieve books. Please try again later." }) // Server error response
    listBooks(@ExtractId() userId: number)
    {
        return this.booksService.listBooks(userId);
    }

    // gets a single book based on it's id
    @Get("details/:id")
    @ApiResponse({ status: 200, description: "Returns details of the requested book." })
    @ApiResponse({ status: 404, description: "Failed to retrieve a book." }) // Not Found response
    @ApiResponse({ status: 500, description: "Failed to retrieve a book. Please try again later." }) // Server error response
    getBookDetails(@Param("id", ParseIntPipe) id: number, @ExtractId() userId: number)
    {
        return this.booksService.getBookDetails(id, userId);
    }

    // edits a book based on it's id
    @Patch("edit/:id")
    @ApiResponse({ status: 200, description: "Book updated successfully." })
    @ApiResponse({ status: 404, description: "Failed to retrieve a book." }) // Not Found response
    @ApiResponse({ status: 500, description: "Failed to update a book. Please try again later." }) // Server error response
    editBook(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) bookInfo: EditBookDto, @ExtractId() userId: number)
    {
        return this.booksService.editBook(id,bookInfo, userId);
    }

    // deletes a book
    @Delete("delete/:id")
    @ApiResponse({ status: 200, description: "A book was deleted successfully." })
    @ApiResponse({ status: 404, description: "Failed to retrieve a book." }) // Not Found response
    @ApiResponse({ status: 500, description: "Failed to delete a book. Please try again later." }) // Server error response
    deleteBook(@Param("id",ParseIntPipe) id: number, @ExtractId() userId: number)
    {
        return this.booksService.deleteBook(id, userId);
    }

    // Searches a book based on an Author and a title
    @Get("search")
    @ApiResponse({ status: 200, description: "Books found matching the search criteria." })
    @ApiResponse({ status: 404, description: "No books match your search criteria." }) // Not Found response
    @ApiResponse({ status: 500, description: "Failed to search books. Please try again later." }) // Server error response
    searchBook(@Query(ValidationPipe) query: SearchBookDto ,@ExtractId() userId: number)
    {
        return this.booksService.searchBook(query, userId);
    }
}
