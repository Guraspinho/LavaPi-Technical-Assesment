import { Body, Controller, Get, Post } from '@nestjs/common';

import { RegisterUserDto } from './usersDto/registerUser.dto';

import { UsersService } from './users.service';
import { LoginUserDto } from './usersDto/loginUser.dto';
 
@Controller('users')
export class UsersController
{
    constructor(private usersService: UsersService) {}
 
    @Post("register")
    register(@Body() userCredentials: RegisterUserDto)
    {
        return this.usersService.register(userCredentials);
    }

    @Post("login")
    login(@Body() userCredentials: LoginUserDto)
    {
        return this.usersService.login(userCredentials)
    }

    @Get("info")
    getUserInfo()
    {
        return this.usersService.getUserInfo();
    }
}
