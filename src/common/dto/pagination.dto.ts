import { IsInt, IsOptional, IsPositive, Max, Min } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsInt({message: "El parametro limit debe ser un entero"})
    @Min(0, {message: "El parametro limit debe ser mayor o igual a cero"})
    limit?: number;

    @IsOptional()
    @IsInt({message: "El parametro offset debe ser un numero entero"})
    @Min(0, {message: "El parametro offset debe ser mayor o igual a 0"})
    offset?: number;

    @IsOptional()
    @IsInt({message: "El parametro isActive debe ser un numero entero"})
    @Min(0, {message: "El parametro isActive debe ser mayor o igual a 0"})
    @Max(1, {message: "El parametro isActive debe tener como valor máximo 1"})
    isActive?: number;

}


