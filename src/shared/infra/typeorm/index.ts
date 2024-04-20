import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export default {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'lennon',
      password: '12345',
      database: 'ecommerce',
      entities: [
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'modules',
          '**',
          'infra',
          'typeorm',
          'entities',
          '*',
        ),
      ],
      synchronize: true,
    };
  },
};
