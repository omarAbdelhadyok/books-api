import { Controller, Post, UseInterceptors, UploadedFile, Body, UseGuards, Get, Query, ValidationPipe, Logger, Param, Patch, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { diskStorage } from 'multer';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {

    private logger = new Logger('BooksController');

    constructor(private booksService: BooksService){}

    @Get()
    getBooks(@Query(ValidationPipe) filterDto: GetBooksFilterDto): Promise<Book[]> {
        this.logger.verbose(`User retriving all books, filters: ${JSON.stringify(filterDto)}`);
        return this.booksService.getBooks(filterDto);
    }

    @Get('/:id')
    getBookById(@Param('id') id: string): Promise<Book> {
        this.logger.verbose(`User retriving book with id ${id}}`);
        return this.booksService.getBookById(id);
    }
    

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createBook(@Body(ValidationPipe) createBookDto: CreateBookDto, @GetUser() user: User): Promise<Book> {
        this.logger.verbose(`User ${user.username} creating a book, Book obj: ${JSON.stringify(createBookDto)}}`);
        return this.booksService.createBook(createBookDto, user);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard('jwt'))
    updateBook(@Param('id') id: string, @Body(ValidationPipe) updateBookDto: UpdateBookDto, @GetUser() user: User): Promise<Book> {
        return this.booksService.updateBook(id, updateBookDto, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    deleteBook(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.booksService.deleteBook(id, user);
    }


    @Post('upload')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file, @GetUser() user: User) {
        this.logger.verbose(`User ${user.username} is uploading file ${file}`);
        const response = {
            originalname: file.originalname,
            filename: file.filename
        };
        return response;
    }
}
