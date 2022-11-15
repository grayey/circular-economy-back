import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorsInterceptor } from 'src/interceptors/errors.interceptor';
import { AppModule } from 'src/modules/app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalInterceptors(
    new ErrorsInterceptor(),
    new TransformInterceptor(),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Circular Economy')
    .setDescription('The Circular Economy API Description by Dotisense')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(8000);
};
bootstrap();
