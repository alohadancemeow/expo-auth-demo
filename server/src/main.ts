import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //Disable NestJS's built-in body parser to allow Better Auth to handle the raw request body
    bodyParser: false,
  });
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  });
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
