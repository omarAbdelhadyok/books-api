import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        TypeOrmModule.forFeature([BookRepository]),
        AuthModule,
        MulterModule.register({
            dest: './files',
        })
    ],
    providers: [BooksService],
    controllers: [BooksController]
})
export class BooksModule { }
