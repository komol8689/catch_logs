import { HttpStatus, Injectable, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/envConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


@Injectable()
export class Application {
  static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    // ------------------ VALIDATSIYA ------------------

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }))
    // ------------------ SWAGGER ------------------
    const configSwagger = new DocumentBuilder()
      .setTitle('LOGS')
      .setVersion('1.0.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();

    const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup(config.API_VERSION, app, documentSwagger);

    const PORT = config.PORT
    const logging = new Logger('Swagger-library');
    await app.listen(PORT, () => {
      {
        setTimeout(() => {
          logging.log(`Swagger UI: http://${config.API_URL}:${PORT}/${config.API_VERSION}`);
        });
      }
    });
  }
}
