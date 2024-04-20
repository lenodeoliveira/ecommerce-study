import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const { APP_PORT, APP_GLOBAL_PREFIX } = process.env;

  const config = new DocumentBuilder()
    .setTitle('Project')
    .setDescription('The Project API description')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${APP_PORT}${APP_GLOBAL_PREFIX}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${APP_GLOBAL_PREFIX}/docs`, app, document);
};