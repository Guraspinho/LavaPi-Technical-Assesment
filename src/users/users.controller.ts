import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractId } from 'src/auth/decorators/user.decorator';
 
@Controller('users')
export class UsersController
{
    constructor(private usersService: UsersService) {}
    
    // for creatin new user and saving it to a database
    @Post("register")
    register(@Body(ValidationPipe) userCredentials: RegisterUserDto)
    {
        return this.usersService.register(userCredentials);
    }

    // after successful login, this function returns an access token
    @Post("login")
    login(@Body(ValidationPipe) userCredentials: LoginUserDto)
    {
        return this.usersService.login(userCredentials)
    }

    // gets user information based on id that is extracted from jwt
    @Get("info")
    @UseGuards(AuthGuard('jwt'))
    getUserInfo(@ExtractId() userId: number)
    {
        return this.usersService.getUserInfo(userId);
    }
}
