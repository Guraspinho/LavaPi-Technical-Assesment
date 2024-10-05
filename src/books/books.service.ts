import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AddBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/editBook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { SearchBookDto } from './dto/searchBook.dto';



@Injectable()
export class BooksService
{

    constructor( @InjectRepository(Book) private bookRepository: Repository<Book> ) {}

    async createBook(bookInfo: AddBookDto, userId: number)
    {
        try
        {
            // Associating the book directly with the user using userId,
            // since users cannot be deleted in this application.
            // Therefore, it's safe to assume the userId is valid and corresponds to an existing user.
            
            const book = this.bookRepository.create({
                ...bookInfo,
                user: {id: userId} 
            });
    
            await this.bookRepository.save(book);
    
            return { message: "Book created successfully", book };
            
        }
        catch (error)
        {
            throw new InternalServerErrorException("Failed to add a book. Please try again later");
        }

    }

    async listBooks(userId: number, page = 1, limit = 10)
    {
        try
        {
            // get a book with pagination limit of 10 books per page
            const [books, total] = await this.bookRepository.findAndCount({
                where: { user: { id: userId } }, 
                take: limit,
                skip: (page - 1) * limit, // Calculate the offset
            });
        
            if(!books.length)
            {
                throw new NotFoundException("Unfortunately, you do not have any books :(");
            }

            return {
                data: books,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit), // Calculate total pages
            };
            
        }
        catch (error)
        {
            if (error instanceof HttpException)
            {
                throw error;  
            }
            throw new InternalServerErrorException("Failed to retrieve books. Please try again later.");
        }
    }

    async getBookDetails(id: number, userId:number)
    {
        try
        {
            const book = await this.bookRepository.findOneBy({id, user: { id:userId }})

            if(!book)
            {
                throw new NotFoundException("Failed to retrieve a book");
            }
            return book;
        }
        catch (error)
        {
            if (error instanceof HttpException)
            {
                throw error;  
            }
            throw new InternalServerErrorException("Failed to retrieve a book. Please try again later.");
        }
    }

    async editBook(id: number, bookInfo: UpdateBookDto, userId:number)
    {
        try
        {
            const book = await this.getBookDetails(id, userId);

            if(!book)
            {
                throw new NotFoundException("Failed to retrieve a book");
            }

            Object.assign(book, bookInfo);

            await this.bookRepository.save(book);

            return { message: "Book updated successfully", book };
        }
        catch (error)
        {
            if (error instanceof HttpException)
            {
                throw error;  
            }
            throw new InternalServerErrorException("Failed to update a book. Please try again later.");
        }
    }

    async deleteBook(id: number, userId: number)
    {
        try
        {
            const book = await this.getBookDetails(id,userId);

            await this.bookRepository.delete({id: book.id})
            
            return {msg: "A book was deleted Successfully"}
        }
        catch (error)
        {
            if (error instanceof HttpException)
            {
                throw error;  
            }
            throw new InternalServerErrorException("Failed to delete a book. Please try again later.");
        }
    }

    async searchBook(query: SearchBookDto, userId:number)
    {
        try
        {
            // creating search options
            const searchConditions = {user: {id: userId}};

            if (query.title)
            {
                searchConditions['title'] = query.title;
            }
    
            if (query.author)
            {
                searchConditions['author'] = query.author;
            }

            // qureying a db based on the options
            const books = await this.bookRepository.find({ where: searchConditions });

            if (books.length === 0)
            {
                throw new NotFoundException("No books match your search criteria");
            }

            return { message: "Books found", books };

        }
        catch (error)
        {
            if (error instanceof HttpException)
            {
                throw error;  
            }
            throw new InternalServerErrorException("Failed to search books. Please try again later.");
        }
    }
}
