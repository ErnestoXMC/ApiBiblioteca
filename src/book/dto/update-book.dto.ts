import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsOptional()
    @IsInt({ message: "El campo activo debe ser un número entero" })
    @Min(0, { message: "El campo activo debe tener como valor minimo cero" })
    @Max(1, { message: "El campo activo debe tener como valor maximo uno" })
    isActive?: number;

}
