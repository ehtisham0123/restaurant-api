import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Validation
    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const nestConfig = configService.get('nest');
    const corsConfig = configService.get('cors');
    const swaggerConfig = configService.get('swagger');

    // Swagger Api
    if (swaggerConfig.enabled) {
      const options = new DocumentBuilder()
        .setTitle('Restaurant API')
        .setDescription('The Restaurant API description')
        .setVersion('1.0')
        .addTag('Restaurant')
        .build();
      const document = SwaggerModule.createDocument(app, options);

      SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    }

    // Cors
    if (corsConfig.enabled) {
      app.enableCors();
    }

    const port = process.env.PORT || nestConfig.port || 3000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Application failed to start:', error);
    process.exit(1); // Exit with failure
  }
}

bootstrap();
