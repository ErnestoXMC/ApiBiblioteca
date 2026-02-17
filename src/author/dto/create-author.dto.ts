import { IsDate, IsDefined, IsEmail, IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { Type } from "class-transformer";


export class CreateAuthorDto {

    @IsString({message: "El campo nombre debe ser texto"})
    @MinLength(1, {message: "El campo nombre, como mínimo debe tener 1 caracter"})
    @MaxLength(150, {message: "El campo nombre debe tener como máximo 150 caracteres"})
    name: string;

    @IsEmail({}, {message: "El campo email debe ser un email válido"})
    @MinLength(1, {message: "El campo email debe tener al menos un caracter"})
    @MaxLength(50, {message: "El campo email debe tener como máximo 50 caracteres"})
    email: string;

    @IsInt({message: "El campo celular debe ser un numero entero"})
    @IsPositive({message: "El campo celular debe ser un numero positivo"})
    phone: number;

    @Type(() => Date)
    @IsDate({message: "El campo fecha de nacimiento debe ser una fecha válida"})
    birthdate: Date;

    @IsString({message: "El campo nacionalidad debe ser un texto"})
    @MinLength(1, {message: "El campo nacionalidad debe tener al menos un caracter"})
    @MaxLength(50, {message: "El campo nacionalidad debe tener como máximo 50 caracteres"})
    nationality: string;
}
