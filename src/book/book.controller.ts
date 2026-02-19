import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('book')
export class BookController {

    constructor(
        private readonly bookService: BookService
    ) { }

    @Post()
    async create(@Body() createBookDto: CreateBookDto) {
        return await this.bookService.create(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseMongoIdPipe) id: string) {
        return await this.bookService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(+id, updateBookDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseMongoIdPipe) id: string) {
        return await this.bookService.remove(id);
    }
}
