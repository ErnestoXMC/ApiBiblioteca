import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthorService } from 'src/author/author.service';
import { AUTHOR_SEED } from './data/author.seed';

@Injectable()
export class SeedService {

	constructor(
		private readonly authorService: AuthorService
	){}

	async executeSeedAuthors() {
		try {
			await this.authorService.fillAuthorsWithSeedData(AUTHOR_SEED);
			return "Seed Executed";
		} catch (error) {
			if(error instanceof BadRequestException) throw error;

			console.log(error);
			throw new InternalServerErrorException("Error al ejecutar seed authors")
		}
	}

}
