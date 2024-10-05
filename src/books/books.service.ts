import { Injectable } from '@nestjs/common';
import { AddBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/editBook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService
{
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}
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
