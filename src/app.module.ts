import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        BooksModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
