import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { User } from 'src/auth/user.entity';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {

    constructor(private bookRepository: BookRepository){}

    getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
        return this.bookRepository.getBooks(filterDto);
    }

    async getBookById(id: string, user?: User): Promise<Book> {
        let found;
        if(user) {
            found = await this.bookRepository.findOne({where: {id, userId: user.id}});
        } else {
            found = await this.bookRepository.findOne({where: {id}})
        }

        if(!found) {
            //even leave empty or throw a custom message
            throw new NotFoundException(`Book with id ${id} was not found`);
        }

        return found;
    }

    createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
        return this.bookRepository.createBook(createBookDto, user);
    }

    async updateBook(id: string, updateBookDto: UpdateBookDto, user: User): Promise<Book> {
        const book = await this.getBookById(id, user);

        book.title = updateBookDto.title;
        book.description = updateBookDto.description;
        book.author = updateBookDto.author;
        book.image_url = updateBookDto.image_url;
        
        await book.save();

        return book;
    }

    async deleteBook(id: string, user: User): Promise<void> {
        const result = await this.bookRepository.delete({id, userId: user.id});
        if(result.affected === 0) throw new NotFoundException(`Task with id ${id} was not found`);
    }

}
