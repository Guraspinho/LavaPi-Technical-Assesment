import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userCredentials: RegisterUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(service, 'register').mockResolvedValue({ message: 'User created successfully' });

      const result = await controller.register(userCredentials);
      expect(result).toEqual({ message: 'User created successfully' });
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const userCredentials: LoginUserDto = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(service, 'login').mockResolvedValue({ message: 'Logged in successfully', token: 'token' });

      const result = await controller.login(userCredentials);
      expect(result).toEqual({ message: 'Logged in successfully', token: 'token' });
    });
  });

  describe('getUserInfo', () => {
    it('should get user info', async () => {
      const userId = 1;
      jest.spyOn(service, 'getUserInfo').mockResolvedValue({
        userInfo: { email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe' },
      });

      const result = await controller.getUserInfo(userId);
      expect(result).toEqual({
        userInfo: { email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe' },
      });
    });
  });
});
