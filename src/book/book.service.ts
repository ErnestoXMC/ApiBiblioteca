import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { isValidObjectId, Model } from 'mongoose';
import { Author } from 'src/author/entities/author.entity';
import { normalizeFields } from 'src/helpers/normalize-fields.util';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

            if (!author)
                throw new NotFoundException(`No se encontro ningun autor con el id '${createBookDto.author}'`);

            //* Creamos nuestro objeto y normalizamos
            const book = new this.bookModel(createBookDto);
            book.title = book.title.toLowerCase().trim();
            book.genre = book.genre.toLowerCase().trim();

            const bookCreated = await this.bookModel.create(book);

            return bookCreated;

        } catch (error) {
            //* Capturamos el error en caso exista de nuestro try
            if (error instanceof NotFoundException) throw error;

            console.log(error);
            throw new InternalServerErrorException("Error al registrar un libro - leer logs");
        }

    }

    async findAll(pagination: PaginationDto) {

        const { limit = 10, offset = 0, isActive } = pagination;

        let filter = {};

        if (isActive === 1 || isActive === 0) {
            filter = { isActive };
        }

        return await this.bookModel.find(filter)
            .populate('author', 'name phone')
            .limit(limit)
            .skip(offset)
            .select('-__v -createdAt -updatedAt');
    }

    async findOne(id: string) {

        let book: Book | null = null;

        if (isValidObjectId(id)) {
            book = await this.bookModel.findById(id).populate('author', 'name phone');
        }

        if (!book)
            throw new NotFoundException(`No se encontro el libro con el id: '${id}'`);

        return book;
    }

    async update(id: string, updateBookDto: UpdateBookDto) {

        try {
            //* Verificamos que exista el libro
            const book: Book | null = await this.bookModel.findById({ _id: id });

            if (!book)
                throw new NotFoundException(`El libro con el id '${id}' no ha sido encontrado`);

            //* Verificamos que exista el autor
            if(updateBookDto.author && isValidObjectId(updateBookDto.author)){
                const author: Author | null = await this.authorModel.findById({_id: updateBookDto.author});

                if(!author)
                    throw new NotFoundException(`El autor con el id: '${updateBookDto.author}' no ha sido encontrado`);
            }

            //* Normalizamos nuestros campos strins y actualizamos nuestra bd
            const camposNormalizar: string[] = ["title", "genre"];
            const bookNormalizado: UpdateBookDto = normalizeFields(updateBookDto, camposNormalizar);

            await book.updateOne(bookNormalizado);

            return {...book.toJSON(), ...bookNormalizado};
            
        } catch (error) {
            if(error instanceof NotFoundException) throw error;

            console.log(error);
            throw new InternalServerErrorException(`Error no se pudo actualizar el cliente con el id '${id}' - leer logs`);
        }
    }

    async remove(id: string) {
        try {
            const { deletedCount } = await this.bookModel.deleteOne({ _id: id });

            if (deletedCount === 0)
                throw new NotFoundException(`No se encontro el libro con el id '${id}'`)

        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            console.log(error);
            throw new InternalServerErrorException("No se pudo eliminar el libro - leer logs");
        }
    }

    async fillBookWithSeedData(books: CreateBookDto[]) {
        try {

            const camposNormalizar = ["title", "genre"];

            const booksNormalize: CreateBookDto[] = books.map(book =>
                normalizeFields(book, camposNormalizar)
            );

            const booksRegistered = await this.bookModel.insertMany(booksNormalize);
            return booksRegistered;

        } catch (error) {
            console.log(error);
            throw new BadRequestException("Error al insertar los libros mediante seed")
        }
    }
}
