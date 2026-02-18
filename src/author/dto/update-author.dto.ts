import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {

    @IsOptional()
    @IsInt({message: "El campo activo debe ser un entero"})
    @Min(0, {message: "El campo activo debe tener como valor minimo cero"})
    @Max(1, {message: "El campo activo debe tener como valor maximo uno"})
    isActive?:number;
}
