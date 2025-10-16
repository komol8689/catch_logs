import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { config } from './config/envConfig';
import { AllExceptionFilter } from './common/exception/all-exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: config.PORT
      }
    });

  app.useGlobalFilters(new AllExceptionFilter())

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  }))
  const PORT = config.PORT

  await app.listen();
  console.log('User server is running PORT', PORT);
}
bootstrap();
