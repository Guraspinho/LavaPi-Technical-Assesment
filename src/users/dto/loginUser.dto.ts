import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";


export class LoginUserDto
{
    @ApiProperty({ description: "The email of the user", example: "user@example.com" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "The password of the user", example: "password123" })
    @IsNotEmpty()
    @IsString()
    password: string;
}   