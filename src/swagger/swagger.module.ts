import { Module } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as yaml from 'js-yaml';
import { writeFileSync } from 'fs';

@Module({})
export class CustomSwaggerModule
{
    static setupSwagger(app: INestApplication)
    {
        const config = new DocumentBuilder()
        .setTitle("Book Management System API")
        .setDescription("This system enables users to manage books with support for user authentication.")
        .setVersion("1.0")
        .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat:"JWT" }, "access-token") // you do not need to pass Bearer prefix when using swagger ui
        .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("api", app, document);

        // for generating swagger.yaml
        // writeFileSync('./swagger.yaml', yaml.dump(document));
    }
}