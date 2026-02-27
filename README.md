<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h1 align="center">Sistema Para Gestion de una Biblioteca</h1>


## Description

Sistema para una gestion de biblioteca, hecho con fin educativo y practico aplicando lo leido en la documentacion oficial de nest y el curso de Fernando Herrera en Udemy.

## 1. Instalar Nest CLI de Forma Global
```
npm i -g @nestjs/cli
```

## 2. Instalar dependencias
```
npm install
```

## 3. Levantar la Base de Datos con Docker
```bash
# Creacion de imagen y contenedor
docker-compose up -d
```

## 4. Configuracion Variables de Entorno
4.1. Clonar el archivo ```.env.template``` y renombrar su copia a ```.env```

4.2. Llenar las variables de entorno definidas en el ```.env```

## 5. Compilar y Ejecutar el Proyecto

```bash
# Desarrollo
npm run start

# Watch mode (recomendado)
npm run start:dev

# Produccion
npm run start:prod
```

## 6. Reconstruir nuestra base de datos con seed
```bash
http://localhost:3000/biblioteca/api/seed
```

## 7. Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno segun nuestro ```.env.template```
3. Crear la nueva imagen
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack Usado
* Nest JS
* TypeScript
* MongoDB
* Mongoose