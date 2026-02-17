import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [

        //* Conexion a MongoDB
        MongooseModule.forRoot('mongodb://localhost:27018/biblioteca'),

        //* Modulos
        AuthorModule,
        CommonModule,
        BookModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
