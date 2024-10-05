import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';

import { RegisterUserDto } from './dto/registerUser.dto';

import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/user.decorator';
 
@Controller('users')
export class UsersController
{
    constructor(private usersService: UsersService) {}
 
    @Post("register")
    register(@Body(ValidationPipe) userCredentials: RegisterUserDto)
    {
        return this.usersService.register(userCredentials);
    }

    @Post("login")
    login(@Body(ValidationPipe) userCredentials: LoginUserDto)
    {
        return this.usersService.login(userCredentials)
    }

    @Get("info")
    @UseGuards(AuthGuard('jwt'))
    getUserInfo(@GetUser() userId: number)
    {
        return this.usersService.getUserInfo(userId);
    }
}
