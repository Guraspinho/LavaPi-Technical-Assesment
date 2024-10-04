import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './usersDto/registerUser.dto';
import { LoginUserDto } from './usersDto/loginUser.dto';
import argon2 from "argon2";


@Injectable()
export class UsersService
{

    register(userCredentials: RegisterUserDto)
    {
        userCredentials.email = userCredentials.email.toLowerCase();
    }


    login(userCredentials: LoginUserDto)
    {
        userCredentials.email = userCredentials.email.toLowerCase();
    }

    getUserInfo()
    {

    }
}
