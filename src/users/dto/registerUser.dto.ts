import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MaxLength, MinLength, IsNotEmpty } from "class-validator";


export class RegisterUserDto
{
    @ApiProperty({ description: "First name of the user", maxLength: 20 })
    @IsString({message:"Please provide a string"})
    @MaxLength(20)
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: "Last name of the user", maxLength: 20 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    lastName: string;
    
    @ApiProperty({ description: "Email of the user", example: "user@example.com" })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Password of the user", minLength: 8 })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}   