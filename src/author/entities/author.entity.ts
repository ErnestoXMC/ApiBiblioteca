import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Author extends Document{

    @Prop({
        required: true
    })
    name: string;

    //* Filtraremos por dni
    @Prop({
        index: true,
        required: true
    })
    dni: number;

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

    @Prop({
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