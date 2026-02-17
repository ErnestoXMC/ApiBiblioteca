import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Author extends Document{

    //* Filtraremos por nombre
    @Prop({
        index: true,
        required: true
    })
    name: string;

    @Prop({
        unique: true,
        required: true
    })
    email: string;

    @Prop({
        unique: true,
        required: true
    })
    phone: number;

    @Prop({
        type: Date,
        required: true
    })
    birthdate: Date;

    //* Filtraremos por nacionalidad
    @Prop({
        index: true,
        required: true
    })
    nationality: string;

    @Prop({
        default: 1
    })
    isActive: number;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
//* Agrega automaticamente el createdAt y el updatedAt
AuthorSchema.set('timestamps', true);