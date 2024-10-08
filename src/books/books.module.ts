import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
	imports:
	[
		TypeOrmModule.forFeature([Book]),
		AuthModule
	],
		providers: [BooksService],
		controllers: [BooksController]
	})
export class BooksModule {}
