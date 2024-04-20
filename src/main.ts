import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './docs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  const allowedSwaggerEnvs = ['dev', 'local'];

  if (allowedSwaggerEnvs.includes(appConfig.get('APP_MODE_API'))) {
    setupSwagger(app);
  }

  app.setGlobalPrefix(appConfig.get('APP_GLOBAL_PREFIX'));

  await app.listen(appConfig.get('APP_PORT'));
}
bootstrap();
