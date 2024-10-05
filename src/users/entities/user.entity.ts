import { Book } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("users")
@Unique(['email'])
export class User 
{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // Adding a One-to-Many relationship to Book
    @OneToMany(() => Book, (book) => book.user)
    books: Book[];
}