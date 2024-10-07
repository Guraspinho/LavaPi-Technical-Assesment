import { Test, TestingModule } from "@nestjs/testing";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/createBook.dto";
import { EditBookDto } from "./dto/editBook.dto";
import { SearchBookDto } from "./dto/searchBook.dto";
import { AuthGuard } from "@nestjs/passport";
import { NotFoundException } from "@nestjs/common";

describe("BooksController", () =>
{
    let booksController: BooksController;
    let booksService: BooksService;

    const mockBooksService =
    {
        createBook: jest.fn(),
        listBooks: jest.fn(),
        getBookDetails: jest.fn(),
        editBook: jest.fn(),
        deleteBook: jest.fn(),
        searchBook: jest.fn(),
    };

    beforeEach(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
            providers:
            [
                {
                    provide: BooksService,
                    useValue: mockBooksService,
                },
            ],
        })
        .overrideGuard(AuthGuard("jwt"))
        .useValue({ canActivate: () => true })
        .compile();

        booksController = module.get<BooksController>(BooksController);
        booksService = module.get<BooksService>(BooksService);
    });

    it("should be defined", () =>
    {
        expect(booksController).toBeDefined();
    });

    describe("createBook", () =>
    {
        it("should create a book and return it", async () =>
        {
            const bookInfo: CreateBookDto = { title: "Test Book", author: "Test Author", publishDate: new Date("2023-10-07T00:00:00.000Z")};
            const userId = 1;

            const result = { message: "Book created successfully", book: { ...bookInfo, id: 1, user: { id: userId } } };
            mockBooksService.createBook.mockResolvedValue(result);

            expect(await booksController.createBook(bookInfo, userId)).toEqual(result);
            expect(booksService.createBook).toHaveBeenCalledWith(bookInfo, userId);
        });
    });

    describe("listBooks", () =>
    {
        it("should return a list of books with pagination", async () =>
        {
            const userId = 1;
            const result =
            {
                data: [{ title: "Test Book", author: "Test Author" }],
                total: 1,
                currentPage: 1,
                totalPages: 1,
            };

            mockBooksService.listBooks.mockResolvedValue(result);

            expect(await booksController.listBooks(userId)).toEqual(result);
            expect(booksService.listBooks).toHaveBeenCalledWith(userId);
        });

        it("should throw a NotFoundException if no books are found", async () =>
        {
            const userId = 1;
            mockBooksService.listBooks.mockRejectedValue(new NotFoundException());

            await expect(booksController.listBooks(userId)).rejects.toThrow(NotFoundException);
        });
    });

    describe("getBookDetails", () =>
    {
        it("should return details of a specific book", async () => {
            const bookId = 1;
            const userId = 1;
            const bookDetails = { id: bookId, title: "Test Book", author: "Test Author" };

            mockBooksService.getBookDetails.mockResolvedValue(bookDetails);

            expect(await booksController.getBookDetails(bookId, userId)).toEqual(bookDetails);
            expect(booksService.getBookDetails).toHaveBeenCalledWith(bookId, userId);
        });

        it("should throw a NotFoundException if book is not found", async () =>
        {
            const bookId = 1;
            const userId = 1;

            mockBooksService.getBookDetails.mockRejectedValue(new NotFoundException());

            await expect(booksController.getBookDetails(bookId, userId)).rejects.toThrow(NotFoundException);
        });
    });

    describe("editBook", () =>
    {
        it("should edit a book and return the updated book", async () =>
        {
            const bookId = 1;
            const userId = 1;
            const bookInfo: EditBookDto = { title: "Updated Title", author: "Updated Author" };

            const updatedBook = { ...bookInfo, id: bookId };

            mockBooksService.editBook.mockResolvedValue({ message: "Book updated successfully", book: updatedBook });

            expect(await booksController.editBook(bookId, bookInfo, userId)).toEqual({
                message: "Book updated successfully",
                book: updatedBook,
            });

            expect(booksService.editBook).toHaveBeenCalledWith(bookId, bookInfo, userId);
        });
    });

    describe("deleteBook", () =>
    {
        it("should delete a book and return a success message", async () =>
        {
            const bookId = 1;
            const userId = 1;

            const result = { msg: "A book was deleted successfully" };
            mockBooksService.deleteBook.mockResolvedValue(result);

            expect(await booksController.deleteBook(bookId, userId)).toEqual(result);
            expect(booksService.deleteBook).toHaveBeenCalledWith(bookId, userId);
        });
    });

    describe("searchBook", () =>
    {
        it("should return books based on search criteria", async () =>
        {
            const userId = 1;
            const query: SearchBookDto = { title: "Test Book", author: "Test Author" };
            const result = { message: "Books found", books: [{ title: "Test Book", author: "Test Author" }] };

            mockBooksService.searchBook.mockResolvedValue(result);

            expect(await booksController.searchBook(query, userId)).toEqual(result);
            expect(booksService.searchBook).toHaveBeenCalledWith(query, userId);
        });

        it("should throw a NotFoundException if no books match the search criteria", async () =>
        {
            const userId = 1;
            const query: SearchBookDto = { title: "Nonexistent Book", author: "Unknown Author" };

            mockBooksService.searchBook.mockRejectedValue(new NotFoundException());

            await expect(booksController.searchBook(query, userId)).rejects.toThrow(NotFoundException);
        });
    });
});
