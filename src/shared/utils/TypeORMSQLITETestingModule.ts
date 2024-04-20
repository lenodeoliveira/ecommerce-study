import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../modules/customers/infra/typeorm/entities/customer.entity';
import { Address } from '../../modules/customers/infra/typeorm/entities/address.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Customer, Address],
    synchronize: true,
  }),
];
