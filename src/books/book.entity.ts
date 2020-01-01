import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity({name: 'books'})
export class Book extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;
    
    @UpdateDateColumn()
    updated: Date;

    @Column({type: 'varchar', length: 20})
    title: string;

    @Column({type: 'varchar', length: 250})
    description: string;

    @Column({type: 'varchar', length: 20})
    author: string;

    @ManyToOne(type => User, user => user.books, {eager: false})
    user: User;

    @Column()
    userId: number;

}