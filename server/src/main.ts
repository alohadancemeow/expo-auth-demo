import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //Disable NestJS's built-in body parser to allow Better Auth to handle the raw request body
    bodyParser: false,
  });
  app.enableCors({
    origin: 'http://localhost:8081', // Expo web origin
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
