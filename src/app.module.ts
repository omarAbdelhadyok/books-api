import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        BooksModule,
        AuthModule,
        MulterModule.register({
            dest: './files',
        }),
        ServeStaticModule.forRoot({
            serveStaticOptions: {
                extensions: ['jpg', 'png'],
                index: false
            },
            rootPath: join(__dirname, '..', 'files'),
          }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
