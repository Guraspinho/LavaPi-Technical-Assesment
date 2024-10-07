import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

// The test checks if the UserssService is defined, ensuring that the service
// is correctly instantiated and available for use
describe("UsersService", () =>
{
    let service: UsersService;
    let userRepository: Repository<User>;
    let jwtService: JwtService;

    beforeEach(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository, // Mock repository
                },
                {
                    provide: JwtService,
                    useValue: {
                        // Mock implementation of JwtService methods as needed
                        sign: jest.fn(),
                        verify: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        jwtService = module.get<JwtService>(JwtService);
    });

    it("should be defined", () =>
    {
        expect(service).toBeDefined();
    });
});
