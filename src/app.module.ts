import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
    imports: [ UsersModule, BooksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

// ConfigModule.forRoot(),
//         TypeOrmModule.forRoot({
//             type: "postgres",
//             host: process.env.DATABASE_HOST,
//             port: parseInt(process.env.DATABASE_PORT),
//             username: process.env.POSTGRES_USER,
//             password: process.env.POSTGRES_PASSWORD,
//             database: process.env.POSTGRES_DB,
//             autoLoadEntities: true,
//             synchronize: true, // Set to false in production!
//         }),