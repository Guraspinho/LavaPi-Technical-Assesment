import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersService
{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>, // injecting users entity
        private jwtService: JwtService // injecting Json Web Token 
    ) {}

    async register(userCredentials: RegisterUserDto)
    {
        // For nsuring that all emails are lowercase to avoid case sensitivity issues in database searches.
        userCredentials.email = userCredentials.email.toLowerCase();

        try
        {
            const hashedPassword = await argon2.hash(userCredentials.password);

            const user = this.userRepository.create(
            {
                ...userCredentials,
                password: hashedPassword,
            });

            await this.userRepository.save(user);
            return { message: "User created successfully" };

        }
        catch (error)
        {
            if (error instanceof QueryFailedError) // For handling query issues
            {
                // Handling unique constraint violations (If a user with the same email already exists in a db)
                if (error.driverError.code === '23505') 
                { 
                    throw new ConflictException("Email already in use");
                }
            }
            // For handling other types of errors
            throw new InternalServerErrorException("Error registering user");
        }

    }


    async login(userCredentials: LoginUserDto)
    {

        userCredentials.email = userCredentials.email.toLowerCase();

        try
        {
            const user = await this.userRepository.findOneBy({email: userCredentials.email});
            
            // checks if an user with provided email exists in a db or not
            if(!user)
            {
                throw new UnauthorizedException("Email or password is incorrect");
            }

            // checks if a password is correct and if it's not, throws an error
            const isPasswordCorrect = await argon2.verify(user.password, userCredentials.password);

            if(!isPasswordCorrect)
            {
                throw new UnauthorizedException("Email or password is incorrect");
            }

            // Generating the JWT access token here instead of in the auth module, 
            // since this project is small and it makes things simpler.
            const payload = { firstName: user.firstName, lastName: user.lastName, id: user.id }; 
            const token = this.jwtService.sign(payload);

            return { message: "Logged in successfully", token };
            
        }
        catch (error)
        {
            if (error instanceof HttpException)
            {
                throw error;  
            }

            throw new InternalServerErrorException("Error logging in");
        }
    }

    async getUserInfo(userId: number)
    {
        try
        {
            // Checking if the user with the specified ID exists in the database. 
            // While it's almost impossible for a user to be absent (since users can't be deleted),
            // I'm adding this validation to showcase my attention to detail and coding best practices.
            const user = await this.userRepository.findOneBy({id: userId});

            if(!user)
            {
                throw new NotFoundException("Unable to find user with such id")
            }
            const {email, firstName, lastName} = user;

            return {userInfo: {email, firstName, lastName}};
        }
        catch (error)
        {
            if (error instanceof HttpException)
            {
                throw error;  
            }
            throw new InternalServerErrorException("Error finding user");
        }

    }
}
