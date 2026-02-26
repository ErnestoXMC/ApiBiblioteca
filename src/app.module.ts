import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
    imports: [

        //* Configuracion para habilitar el uso de variables de entorno
        ConfigModule.forRoot({
            load: [EnvConfiguration],
            validationSchema: JoiValidationSchema
        }),

        //* Conexion a MongoDB
        MongooseModule.forRoot(process.env.MONGODB!, {
            dbName: 'biblioteca'
        }),

        //* Modulos
        AuthorModule,
        CommonModule,
        BookModule,
        SeedModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
