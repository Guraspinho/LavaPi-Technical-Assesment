import { IsString, IsEmail, MaxLength, MinLength, IsNotEmpty } from "class-validator";


export class RegisterUserDto
{
    @IsString({message:"Please provide a string"})
    @MaxLength(20)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}   