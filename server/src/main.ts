import { NestFactory } from '@nestjs/core';
import { FormModule } from './form.module';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(FormModule); // --> Inyección de la aplicación(punto de partida)
  app.use(cors());
  app.use('/upload', express.static(path.join(__dirname, '/../upload'))); // --> middleware para carga de archivos locales
  await app.listen(3000);
}
bootstrap();
