import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './entities/author.entity';
import { Model } from 'mongoose';
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
            if(error.code === 11000){
                throw new BadRequestException("Error al registrar el autor, columnas repetidas")
            } else {
                console.log(error);
                throw new InternalServerErrorException("Error interno al registrar el author - leer logs")
            }
        }
    }

    async createMany(createAuthorDto: CreateAuthorDto[]){
        try {
            
            const createAuthorDtoFilter = createAuthorDto.map(author => {
                author.name = author.name.toLowerCase().trim();
                author.email = author.email.toLowerCase().trim();
                author.nationality = author.nationality.toLocaleLowerCase().trim();
                return author;
            });

            return await this.authorModel.insertMany(createAuthorDtoFilter);

        } catch (error) {
            if(error.code === 11000){
                throw new BadRequestException("Error al insertar varios registros, existen elementos duplicados");
            } else {
                console.log(error);
                throw new InternalServerErrorException("Error no se pudo insertar los registros en nuestra base de datos - leer logs");
            }
        }
    }

    //* Paginacion con limit, offset y isActive (visualizar activos)
    async findAll(pagination: PaginationDto) {

        const {limit = 10, offset = 0, isActive} = pagination;

        let filter = {};

        if(isActive === 1 || isActive === 0){
            filter = {isActive}
        }

        //* Por Defecto nos trae todos los usuarios, limite de 10 y desde el primer registro
        return await this.authorModel.find(filter)
                                        .limit(limit)
                                        .skip(offset)
                                        .select('-__v -createdAt -updatedAt');
    }

    findOne(id: number) {
        return `This action returns a #${id} author`;
    }

    update(id: number, updateAuthorDto: UpdateAuthorDto) {
        return `This action updates a #${id} author`;
    }

    remove(id: number) {
        return `This action removes a #${id} author`;
    }
}
