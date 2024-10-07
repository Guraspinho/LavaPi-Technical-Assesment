import { Test, TestingModule } from "@nestjs/testing";
import { BooksService } from "./books.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Book } from "./entities/book.entity";
import { Repository } from "typeorm";

// The test checks if the BooksService is defined, ensuring that the service
// is correctly instantiated and available for use
describe("BooksService", () =>
{
    let service: BooksService;
    let bookRepository: Repository<Book>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getRepositoryToken(Book),
                    useClass: Repository, // Mock repository
                },
            ],
        }).compile();

        service = module.get<BooksService>(BooksService);
        bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    });

    it("should be defined", () =>
    {
        expect(service).toBeDefined();
    });
});
  