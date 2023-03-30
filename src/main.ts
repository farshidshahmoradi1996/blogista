import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // middleware's
  // app.enableCors();
  // app.use(helmet());

  // auto validation
  app.useGlobalPipes(new ValidationPipe());

  // run application
  await app.listen(process.env.PORT);
}
bootstrap();
