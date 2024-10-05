import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import argon2 from "argon2";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService
{
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async register(userCredentials: RegisterUserDto)
    {

        userCredentials.email = userCredentials.email.toLowerCase();

    }


    async login(userCredentials: LoginUserDto)
    {
        userCredentials.email = userCredentials.email.toLowerCase();
    }

    getUserInfo()
    {

    }
}
