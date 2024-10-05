import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { RegisterUserDto } from './dto/registerUser.dto';

import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginUser.dto';
 
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
    getUserInfo()
    {
        return this.usersService.getUserInfo();
    }
}
