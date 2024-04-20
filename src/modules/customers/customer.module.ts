import { Module } from '@nestjs/common';
import { Customer } from './infra/typeorm/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './infra/typeorm/entities/address.entity';
import { CreateCustomerUseCase } from './usecases/createCustomer/create.customer.usecase';
import { CustomerRepository } from './infra/typeorm/repositories/customers/customers.repository';
import { CustomersController } from './infra/http/controllers/customers.controller';
import { FindCustomerByEmailUseCase } from './usecases/findCustomerByEmail/find.customer.by.email.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Address])],
  controllers: [CustomersController],
  providers: [
    CreateCustomerUseCase,
    FindCustomerByEmailUseCase,
    {
      provide: 'CustomerRepositoryDB',
      useClass: CustomerRepository,
    },
  ],
  exports: [
    {
      provide: 'CustomerRepositoryDB',
      useClass: CustomerRepository,
    },
  ],
})
export class CustomersModule {}
