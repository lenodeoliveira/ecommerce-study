import { TypeOrmModule } from '@nestjs/typeorm';
//import { Customer } from '../infra/typeorm/entities/customer.entity';
//import { Address } from '../infra/typeorm/entities/address.entity';
import * as path from 'path';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [
      path.resolve(
        __dirname,
        '..',
        '..',
        'shared',
        '**',
        'infra',
        'typeorm',
        'entities',
        '*',
      ),
    ],
    synchronize: true,
  }),
];
