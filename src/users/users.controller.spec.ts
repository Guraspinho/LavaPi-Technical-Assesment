import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";

describe("UsersController", () =>
{
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () =>
    {
        // this creates a testing module with the UsersController and a mock of UsersService
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers:
            [
                {
                    provide: UsersService,
                    useValue:
                    {
                        register: jest.fn(),
                        login: jest.fn(),
                        getUserInfo: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    // A simple test to check if the controller is defined
    it("should be defined", () =>
    {
        expect(controller).toBeDefined();
    });

    
    describe("register", () =>
    {
        it("should register a new user", async () =>
        {
            // Our sample user is going to be Peter Parker
            const userCredentials: RegisterUserDto =
            {
                firstName: "Peter",
                lastName: "Parker",
                email: "Peter.Parker@example.com",
                password: "password123",
            };

            jest.spyOn(service, "register").mockResolvedValue({ message: "User created successfully" });

            const result = await controller.register(userCredentials);
            expect(result).toEqual({ message: "User created successfully" });
        });
    });

   

    describe("login", () =>
    {
        it("should login a user", async () =>
        {
            // Define the user credentials we'll use for the test
            const userCredentials: LoginUserDto =
            {
                email: "Peter.Parker@example.com",
                password: "password123",
            };

            // Mocks the service's login method to return a success message and a token
            jest.spyOn(service, "login").mockResolvedValue({ message: "Logged in successfully", token: "token" });

            const result = await controller.login(userCredentials);
            expect(result).toEqual({ message: "Logged in successfully", token: "token" });
        });
    });



    describe("getUserInfo", () =>
    {
        it("should get user info", async () =>
        {
            // Define the user ID we'll use for the test
            const userId = 1;
            jest.spyOn(service, "getUserInfo").mockResolvedValue({
                userInfo: { email: "Peter.Parker@example.com", firstName: "Peter", lastName: "Parker" },
            });

            const result = await controller.getUserInfo(userId);
            expect(result).toEqual({
                userInfo: { email: "Peter.Parker@example.com", firstName: "Peter", lastName: "Parker" },
            });
        });
    });
});
