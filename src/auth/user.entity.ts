import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Book } from "src/books/book.entity";
import * as bcrypt from 'bcrypt';

@Entity({name: 'users'})
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20})
    username: string;

    @Column({type: 'text'})
    password: string;

    @Column({type: 'text'})
    salt: string;

    @OneToMany(type => Book, book => book.user, {eager: true})
    books: Book[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}