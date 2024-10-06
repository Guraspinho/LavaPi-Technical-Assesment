import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomSwaggerModule } from './swagger/swagger.module';


async function bootstrap()
{
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    // Setup Swagger
    CustomSwaggerModule.setupSwagger(app);

    await app.listen(3000);
}
bootstrap();
