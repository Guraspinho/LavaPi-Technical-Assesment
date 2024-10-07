
## Book Management System

This system enables users to manage books with support for user authentication.

## Project Overview

This project is built using **npm** and **TypeScript**. It includes user authentication and a protected books module. Below is a detailed explanation of the key features and functionalities.

### User Registration and Login

1. **User Registration**: 
   - New users must register by providing necessary details such as first name, last name, email, and password.

2. **User Login**: 
   - Registered users can log in by providing their credentials (username/email and password).
   - Upon successful login, users receive a JSON Web Token (JWT) which is used for authenticating subsequent requests.

### JWT Authentication

- **JWT Bearer Token**: 
  - After logging in, users receive a JWT token.
  - This token must be included in the `Authorization` header as a Bearer token for accessing protected routes.
  - Example: `Authorization: Bearer <your-jwt-token>`

### Books Module

- **Protected Routes**: 
  - All routes within the books module are protected.
  - Users must include a valid JWT token in the authorization header to access these routes.
  - Unauthorized requests (without a valid token) will be denied access.

### Features

1. **Basic Features**:
   - User registration and login.
   - CRUD operations on books.
   - JWT-based authentication for securing routes.
   - Error handling and validation.

2. **Bonus Feature**:
   - **Book Search**: 
     - Users can search for books using criteria (title, author).
     - This feature enhances the user experience by allowing easy access to book information.

### Compliance

- The project meets all the requirements specified in the assessment sheet.
- It also includes additional features to enhance functionality and user experience.

### Getting Started

1. **Installation**:
   - Clone the repository.
   - Run `npm install` to install all dependencies.

2. **Running the Project**:
   - Use `npm start` to run the project.
   - Ensure you have a valid JWT token for accessing protected routes.

### Conclusion

This project demonstrates a robust implementation of user authentication and protected routes using JWT. The additional book search feature provides an enhanced user experience, making it a comprehensive solution for managing user and book information.

## 1. Getting Started

### 1.1 Project Configuration

Start by cloning this project on your workstation.

```sh
git clone git@github.com:Guraspinho/LavaPi-Technical-Assesment.git
```

Next, install all the dependencies of the project.

```sh
cd ./LavaPi-Technical-Assesment
npm install
```

Once the dependencies are installed, configure your project by creating new `.env` and `.env.test` files containing the environment variables used for development.

`.env` should contain:  
- `ACCESS_TOKEN_SECRET`: A secret key for signing the JWT tokens.
- `ACCESS_TOKEN_LIFETIME`: The lifetime of the JWT tokens.

For database configuration, use the following variables (as specified in `docker-compose`):

```sh
DATABASE_HOST=database
DATABASE_PORT=5432
POSTGRES_USER=irakli
POSTGRES_PASSWORD=A11qitshors
POSTGRES_DB=your_postgres_db
```

*Note: This configuration is only for demonstration purposes. For production, I would use more secure methods for managing environment variables and sensitive information.*

`.env.test` should contain: `ACCESS_TOKEN_SECRET`

### 1.2 Launch and Discover

You can start the project using Docker Compose. This will help you quickly set up and run the application in a containerized environment.

First, ensure you have Docker and Docker Compose installed on your workstation.

To start the project, run the following command:

```sh
docker-compose up
```

This command will build and run the Docker containers defined in the `docker-compose.yml` file. 

Since the application is connected to a database, ensure the database service is running. The command above ensures that the database is up and running.

To stop the containers, use:

```sh
docker-compose down
```

Make sure your `docker-compose.yml` file includes the necessary configurations for running the application, such as environment variables and service definitions.

You can now visit [http://localhost:3000/api](http://localhost:3000/api) to view the API Swagger documentation.

For restricted routes, you can use the JWT by simply passing the token itself; there’s no need to include the "Bearer" prefix.

You can find the documentation in the `swagger.yaml` file as well.

## 2. Project Structure

```sh
src/
├── auth/
│   ├── decorators/       # Stores decorator functions for extracting user's id from JWT.
│   ├── guards/           # Stores JWT auth guard files, with corresponding spec file.
│   ├── strategies/       # Stores JWT strategy files for Passport, with corresponding spec file.
│   ├── auth.module.ts
│
├── books/
│   ├── dto/              # Stores files for Book DTOs.
│   ├── entities/         # Stores files for Book entities.
│   ├── books.controller.ts  # Controller for books, with corresponding spec file.
│   ├── books.module.ts      # Module for books.
│   ├── books.service.ts     # Service for books, with corresponding spec file.
│
├── users/
│   ├── dto/              # Stores files for User DTOs.
│   ├── entities/         # Stores files for User entities.
│   ├── users.controller.ts  # Controller for users, with corresponding spec file.
│   ├── users.module.ts      # Module for users.
│   ├── users.service.ts     # Service for users, with corresponding spec file.
│
├── swagger/              
│   ├── swagger.module.ts    # Stores swagger configuration
│
├── app.controller.ts     # Main application controller, with corresponding spec file.
├── app.module.ts         # Main application module.
├── app.service.ts        # Main application service.
├── main.ts               # Entry point of the application.
```

## 3. Testing

```sh
# Run the project's functional tests
npm run test
```

I used Jest and NestJS built-in testing modules for testing the application. Jest configuration is in `package.json`. I have implemented unit testing for the auth module (guards and strategies), the books module (`BookController`), and the users module (`UserController`). Additionally, I have written tests for every DTO in the project, ensuring that the data transfer objects validate inputs as expected. Furthermore, I have tests that verify that `UsersService` and `BooksService` are correctly defined and ready to use.