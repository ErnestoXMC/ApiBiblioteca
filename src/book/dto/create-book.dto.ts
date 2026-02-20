import { IsDate, IsMongoId, IsString, MaxLength, MinLength } from "class-validator";
import { Type } from "class-transformer";


export class CreateBookDto {

    @IsString({message: "El campo titulo debe ser texto"})
    @MinLength(1, {message: "El campo titulo, como mínimo debe tener 1 caracter"})
    @MaxLength(150, {message: "El campo titulo debe tener como máximo 150 caracteres"})    
    title: string;

    @Type(() => Date)
    @IsDate({message: "El campo fecha de lanzamiento debe ser una fecha válida"})
    releaseDate: Date;

    @IsString()
    @MinLength(1, {message: "El campo genero debe tener al menos un caracter"})
    @MaxLength(50, {message: "El campo genero debe tener como máximo 50 caracteres"})
    genre: string;

    @IsMongoId({message: "El campo author debe ser un Id válido"})
    @MinLength(20, {message: "El campo author debe tener al menos un caracter"})
    @MaxLength(30, {message: "El campo author debe tener como máximo 30 caracteres"})
    author: string;
}
