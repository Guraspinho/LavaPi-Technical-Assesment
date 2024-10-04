import { Injectable } from '@nestjs/common';
import { AddBookDto } from './booksDto/createBook.dto';
import { UpdateBookDto } from './booksDto/editBook.dto';

@Injectable()
export class BooksService
{
    createBook(bookInfo: AddBookDto)
    {

    }

    listBooks()
    {

    }

    getBookDetails(id: number)
    {

    }

    editBook(id: number, bookInfo: UpdateBookDto)
    {

    }

    deleteBook(id: number)
    {

    }

    searchBook(query: { title?: string; author?: string })
    {

    }
}
