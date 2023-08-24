import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const certificatePath = path.join(__dirname, '../openssl/certificate'); // Adjust the path here

  const httpsOptions = {
    key: fs.readFileSync(path.join(certificatePath, 'server.key')),
    cert: fs.readFileSync(path.join(certificatePath, 'server.crt')),
  };

  const app = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions,
  });

  const config = new DocumentBuilder()
    .setTitle('FETIN - Credit Control API')
    .setDescription('API to control credit of clients')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
