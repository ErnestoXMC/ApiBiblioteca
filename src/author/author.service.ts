import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './entities/author.entity';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AuthorService {
    constructor(
        @InjectModel(Author.name)
        private authorModel: Model<Author>,
    ) { }

    async create(createAuthorDto: CreateAuthorDto) {
        try {
            const author = new this.authorModel(createAuthorDto);
            author.name = author.name.toLowerCase().trim();
            author.email = author.email.toLowerCase().trim();
            author.nationality = author.nationality.toLowerCase().trim();

            const createdAuthor = await author.save();

            return createdAuthor;

        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException("Error al registrar el autor, columnas repetidas")
            } else {
                console.log(error);
                throw new InternalServerErrorException("Error interno al registrar el author - leer logs")
            }
        }
    }
    
    //* Paginacion con limit, offset y isActive (visualizar activos)
    async findAll(pagination: PaginationDto) {

        const { limit = 10, offset = 0, isActive } = pagination;

        let filter = {};

        if (isActive === 1 || isActive === 0) {
            filter = { isActive }
        }

        //* Por Defecto nos trae todos los usuarios, limite de 10 y desde el primer registro
        return await this.authorModel.find(filter)
            .limit(limit)
            .skip(offset)
            .select('-__v -createdAt -updatedAt');
    }

    async findOne(term: string) {

        //* Previa a una consulta validar la longitud del termino
        const longitudTermino = term.length;

        if (longitudTermino > 30)
            throw new BadRequestException("El termino de búsqueda es demasiado largo");

        let author: Author | null = null;

        //* Filtrado por MongoId
        if (isValidObjectId(term)) {
            author = await this.authorModel.findById(term);
        }

        //* Filtrado por Dni
        if (!author && !isNaN(Number(term))) {
            author = await this.authorModel.findOne({ dni: Number(term) });
        }

        if (!author)
            throw new NotFoundException(`El Autor con el termino de busqueda '${term}' no ha sido encontrado`);

        return author;
    }

    async update(id: string, updateAuthorDto: UpdateAuthorDto) {

        try {

            const author: Author | null = await this.authorModel.findById(id);

            if(!author)
                throw new NotFoundException(`El autor con el id '${id}' no ha sido encontrado`);

            const camposNormalizar = ["name", "email", "nationality"];

            camposNormalizar.forEach(campo => {
                if(updateAuthorDto[campo]){
                    updateAuthorDto[campo] = updateAuthorDto[campo].toLowerCase().trim();
                }
            })

            await author.updateOne(updateAuthorDto);

            return {...author.toJSON(), ...updateAuthorDto};
            
        } catch (error) {
            //* Obtenemos la instancia de nuestro notfoundexcepcion
            if(error instanceof NotFoundException) throw error;

            console.log(error);
            throw new BadRequestException(`No se pudo actualizar al autor con el if '${id}', leer logs`);
        }
    }

    async remove(id: string) {
        try {
            const { deletedCount } = await this.authorModel.deleteOne({ _id: id });

            if (deletedCount === 0)
                throw new NotFoundException(`No se encontro el autor con el id: ${id}`)

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("No se pudo eliminar el autor, leer logs");
        }
    }

    async fillAuthorsWithSeedData(authors: CreateAuthorDto[]) {
        try {

            const camposNormalizar = ["name", "email", "nationality"];

            const authorsNormalize = authors.map(author => {
                camposNormalizar.forEach(campo => {
                    if(author[campo]){
                        author[campo] = author[campo].toLowerCase().trim();
                    }
                })
                return author;
            })

            const authorsRegistered = await this.authorModel.insertMany(authorsNormalize);
            return authorsRegistered;

        } catch (error) {
            if(error.code === 11000){
                throw new BadRequestException("Elemenos duplicados al registrar varios autores por seed")
            } else{
                console.log(error);
                throw new InternalServerErrorException("Error al insertar varios autores por seed - leer logs");
            }
        }
    }
}
