import { Repository, EntityRepository } from "typeorm";
import { Book } from "./book.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { GetBooksFilterDto } from "./dto/get-books-filter.dto";

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {

    private logger = new Logger();

    async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
        const {search} = filterDto;
        const query = this.createQueryBuilder('book');

        if(search) {
            query.andWhere('(UPPER(book.title) LIKE UPPER(:search) OR UPPER(book.description) LIKE UPPER(:search)OR UPPER(book.author) LIKE UPPER(:search))', {search: `%${search}%`});
        }
        try {
            return query.getMany();
        } catch (error) {
            this.logger.error(`failed to get books, with filters: ${JSON.stringify(filterDto), error.stack}`)
            throw new InternalServerErrorException();
        }
    }
    
    async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
        const {title, description, author, image_url} = createBookDto;

        const book = new Book();
        book.title = title;
        book.description = description;
        book.author = author;
        book.image_url = image_url;
        book.user = user;

        try {
            await book.save();
        } catch(error) {
            throw new InternalServerErrorException();
        }
        
        delete book.user;
        return book;
    }

}