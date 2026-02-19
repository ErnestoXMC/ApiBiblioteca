import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Author } from "src/author/entities/author.entity";

@Schema()
export class Book extends Document {

    @Prop({
        required: true
    })
    title: string;

    @Prop({
        type: Date,
        required: true
    })
    releaseDate: Date;

    @Prop({
        required: true
    })
    genre: string;

    @Prop({
        type: Types.ObjectId,
        ref: Author.name,
        required: true
    })
    author: Types.ObjectId;

    @Prop({
        default: 1
    })
    isActive: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.set('timestamps', true);