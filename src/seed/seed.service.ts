import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthorService } from 'src/author/author.service';
import { AUTHOR_SEED } from './data/author.seed';
import { Author } from 'src/author/entities/author.entity';
import { BOOK_SEED } from './data/book.seed';
import { BookService } from 'src/book/book.service';

@Injectable()
export class SeedService {

	constructor(
		private readonly authorService: AuthorService,
		private readonly bookService: BookService
	){}

	async executeSeed() {
		try {
			const authorsRegistered = await this.authorService.fillAuthorsWithSeedData(AUTHOR_SEED);
			await this.registerSeedBooks(authorsRegistered);

			return "Seed Executed";
		} catch (error) {
			if(error instanceof BadRequestException) throw error;

			console.log(error);
			throw new InternalServerErrorException("Error al ejecutar seed authors")
		}
	}

	private async registerSeedBooks(authors: Author[]){

		const authorsArray = authors.map(a => a.toObject());

		const newBookSeed = BOOK_SEED.map(book => {
			const randomIndex = Math.floor(Math.random() * authorsArray.length);
			book.author = authorsArray[randomIndex]._id;
			return book;
		})
		
		try {
			await this.bookService.fillBookWithSeedData(newBookSeed);
		} catch (error) {
			if(error instanceof BadRequestException) throw error;

			console.log(error);
			throw new InternalServerErrorException("No se pudo insertar varios registros desde seed - leer logs")
		}

	}

}
