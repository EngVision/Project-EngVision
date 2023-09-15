import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  //app config
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  //setup middleware
  app.use(cookieParser());
  app.use(helmet({ crossOriginResourcePolicy: false }));

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
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, swaggerOptions);

  await app.listen(port);
  console.log(`Server running on: ${await app.getUrl()}`);
}

bootstrap();
