import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('author')
export class AuthorController {

    constructor(
        private readonly authorService: AuthorService
    ) { }

    @Post()
    async create(@Body() createAuthorDto: CreateAuthorDto) {
        return await this.authorService.create(createAuthorDto);
    }

    //! Endpoint Para Desarrollo - Eliminar al crear un seed
    @Post('bulk')
    async createMany(@Body() createAuthorDto: CreateAuthorDto[]) {
        return await this.authorService.createMany(createAuthorDto);
    }

    @Get()
    async findAll(@Query() pagination: PaginationDto) {
        return await this.authorService.findAll(pagination);
    }

    @Get(':term')
    async findOne(@Param('term') term: string) {
        return await this.authorService.findOne(term);
    }

    @Patch(':id')
    update(
        @Param('id') id: string, 
        @Body() updateAuthorDto: UpdateAuthorDto
    ) {
        return this.authorService.update(+id, updateAuthorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authorService.remove(+id);
    }
}
