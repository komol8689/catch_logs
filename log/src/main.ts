import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from './config/envConfig';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = config.PORT
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: config.PORT
      }
    });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  }))

  await app.listen();
  console.log('Log server is running PORT', PORT);
  // console.log('http://localhost:' + PORT)
}
bootstrap();
