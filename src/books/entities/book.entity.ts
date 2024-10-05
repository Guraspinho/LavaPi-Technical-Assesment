import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("books")
export class Book
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    author: string;

    @Column({ type: 'date' })
    publishDate: Date;

    // Adding a Many-to-One relationship to User
    @ManyToOne(() => User, (user) => user.books)
    user: User;
}