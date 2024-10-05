import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}