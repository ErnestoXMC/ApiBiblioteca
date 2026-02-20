import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('author')
export class AuthorController {

    constructor(
        private readonly authorService: AuthorService
    ) { }

    @Post()
    async create(@Body() createAuthorDto: CreateAuthorDto) {
        return await this.authorService.create(createAuthorDto);
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
    async update(
        @Param('id', ParseMongoIdPipe) id: string, 
        @Body() updateAuthorDto: UpdateAuthorDto
    ) {
        return await this.authorService.update(id, updateAuthorDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseMongoIdPipe) id: string) {
        return await this.authorService.remove(id);
    }
}
