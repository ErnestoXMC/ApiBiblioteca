import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { Author, AuthorSchema } from 'src/author/entities/author.entity';

@Module({
    controllers: [BookController],
    providers: [BookService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Book.name,
                schema: BookSchema
            },
            {
                name: Author.name,
                schema: AuthorSchema
            }
        ])
    ]
})
export class BookModule { }
