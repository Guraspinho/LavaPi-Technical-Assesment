
## Book Management System

This system will enable users to manage books with support for user authentication.

## Description


## 1. Getting started

### 1.1 Project configuration

Start by cloning this project on your workstation.

```sh
git clone git@github.com:Guraspinho/LavaPi-Technical-Assesment.git
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./LavaPi-Technical-Assesment
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` and `.env.test` files containing the environment variables used for development.

`.env` should contain: `DATABASE_HOST`, `POSTGRES_DB`, `DATABASE_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_LIFETIME`

`.env.test` should contain: `ACCESS_TOKEN_SECRET`


### 1.2 Launch and discover

You can start the project using Docker Compose. This will help you quickly set up and run the application in a containerized environment.

First, ensure you have Docker and Docker Compose installed on your workstation.

To start the project, run the following command:

```sh
docker-compose up
```

This command will build and run the Docker containers defined in the `docker-compose.yml` file.

To stop the containers, use:

```sh
docker-compose down
```

Make sure your `docker-compose.yml` file includes the necessary configurations for running the application, such as environment variables and service definitions.


## 2. Project structure

```sh
src/
├── auth/
│   ├── decorators/       # Stores decorator functions for extracting user's id from JWT, with corresponding spec files.
│   ├── guards/           # Stores JWT auth guard files, with corresponding spec files.
│   ├── strategies/       # Stores JWT strategy files for Passport, with corresponding spec files.
│   ├── auth.module.ts
│
├── books/
│   ├── dto/              # Stores files for Book DTOs.
│   ├── entities/         # Stores files for Book entities.
│   ├── books.controller.ts  # Controller for books, with corresponding spec file.
│   ├── books.module.ts      # Module for books, with corresponding spec file.
│   ├── books.service.ts     # Service for books, with corresponding spec file.
│
├── users/
│   ├── dto/              # Stores files for User DTOs.
│   ├── entities/         # Stores files for User entities.
│   ├── users.controller.ts  # Controller for users, with corresponding spec file.
│   ├── users.module.ts      # Module for users, with corresponding spec file.
│   ├── users.service.ts     # Service for users, with corresponding spec file.
│
├── app.controller.ts     # Main application controller, with corresponding spec file.
├── app.module.ts         # Main application module.
├── app.service.ts        # Main application service.
├── main.ts               # Entry point of the application.
```


## 3. default npm commands

```sh
# Start the application using the transpiled NodeJS
npm run start

# Run the application using "ts-node"
npm run dev

# Transpile the TypeScript files
npm run build

# Run the project' functional tests
npm run test
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
