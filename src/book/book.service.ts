import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { isValidObjectId, Model } from 'mongoose';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private readonly bookModel: Model<Book>,

        @InjectModel(Author.name)
        private readonly authorModel: Model<Author>
    ) { }


    async create(createBookDto: CreateBookDto) {
        try {

            //* Validamos que exista el author con el id de nuestro request
            const author: Author | null = await this.authorModel.findById(createBookDto.author);

            if(!author)
                throw new NotFoundException(`No se encontro ningun autor con el id '${createBookDto.author}'`);

            //* Creamos nuestro objeto y normalizamos
            const book = new this.bookModel(createBookDto);
            book.title = book.title.toLowerCase().trim();
            book.genre = book.genre.toLowerCase().trim();

            const bookCreated = await this.bookModel.create(book);

            return bookCreated;

        } catch (error) {
            //* Capturamos el error en caso exista de nuestro try
            if(error instanceof NotFoundException) throw error;

            console.log(error);
            throw new InternalServerErrorException("Error al registrar un libro - leer logs");
        }

    }

    findAll() {
        return `This action returns all book`;
    }

    async findOne(id: string) {

        let book: Book | null = null;

        if(isValidObjectId(id)){
            book = await this.bookModel.findById(id).populate('author', 'name phone');
        }

        if(!book)
            throw new NotFoundException(`No se encontro el libro con el id: '${id}'`);

        return book;
    }

    update(id: number, updateBookDto: UpdateBookDto) {
        return `This action updates a #${id} book`;
    }

    async remove(id: string) {
        try {
            const {deletedCount} = await this.bookModel.deleteOne({_id: id});

            if(deletedCount === 0)
                throw new NotFoundException(`No se encontro el libro con el id '${id}'`)

        } catch (error) {
            if(error instanceof NotFoundException) throw error;

            console.log(error);
            throw new InternalServerErrorException("No se pudo eliminar el libro - leer logs");
        }
    }
}
