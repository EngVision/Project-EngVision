import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const port = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  //app config
  app.setGlobalPrefix('api', { exclude: ['*'] });
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  //setup middleware
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute in milliseconds
      max: 100, // limit each IP to 100 requests per minute
    }),
  );

  //setup pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  //setup swagger
  const config = new DocumentBuilder()
    .setTitle('EngVision API')
    .setDescription('Click Try it out to see the API in action')
    .setVersion('1.0')
    .build();
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
    useGlobalPrefix: true,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.listen(port);
  console.log(`Server running on: ${await app.getUrl()}`);
}

bootstrap();
