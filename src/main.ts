import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //* Configuracion validators (dtos)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                exposeUnsetFields: false,
                enableImplicitConversion: true
            }
        })
    )

    //* Prefijo Global de nuestra api
    app.setGlobalPrefix('biblioteca/api')

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
