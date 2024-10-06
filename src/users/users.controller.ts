import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractId } from 'src/auth/decorators/user.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
 
@Controller('users')
export class UsersController
{
    constructor(private usersService: UsersService) {}
    
    // for creatin new user and saving it to a database
    @Post("register")
    @ApiResponse({ status: 201, description: "User registered successfully." })
    @ApiResponse({ status: 409, description: "Email already in use" }) // Conflict response
    @ApiResponse({ status: 500, description: "Error registering user" }) // Server error response
    register(@Body(ValidationPipe) userCredentials: RegisterUserDto)
    {
        return this.usersService.register(userCredentials);
    }

    // after successful login, this function returns an access token
    @Post("login")
    @ApiResponse({ status: 200, description: "Login successful, returns access token." })
    @ApiResponse({ status: 401, description: "Email or password is incorrect" }) // Unauthorized response
    @ApiResponse({ status: 500, description: "Error logging in" }) // Server error response
    login(@Body(ValidationPipe) userCredentials: LoginUserDto)
    {
        return this.usersService.login(userCredentials)
    }

    // gets user information based on id that is extracted from jwt
    @Get("info")
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth("access-token") // Indicates that this endpoint requires a bearer token
    @ApiResponse({ status: 200, description: "Returns user information." })
    @ApiResponse({ status: 401, description: "Unauthorized." })
    @ApiResponse({ status: 500, description: "Error finding user" }) // Server error response
    getUserInfo(@ExtractId() userId: number)
    {
        return this.usersService.getUserInfo(userId);
    }
}
