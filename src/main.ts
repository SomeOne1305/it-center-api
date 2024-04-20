import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  });

  const config = new DocumentBuilder()
    .setTitle('Students list')
    .setDescription('IT-center students and registration list')
    .setVersion('1.0')
    .addTag('Students')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
