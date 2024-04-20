import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUsecase } from 'src/shared/protocols/usecase/IUsecase';
import { CreateCustomerInPut } from './customer.types';
import { ICustomerRepository } from 'src/modules/customers/infra/typeorm/interface/customers/ICustomers';

@Injectable()
export class CreateCustomerUseCase implements IUsecase {
  constructor(
    @Inject('CustomerRepositoryDB')
    private readonly customerRepository: ICustomerRepository,
  ) {}
  public async exec(input: CreateCustomerInPut): Promise<any> {
    const customerExists = await this.customerRepository.findByEmail(
      input?.email,
    );
    if (customerExists) {
      throw new ConflictException('Já existe usuário com esse e-mail');
    }
    const customer = await this.customerRepository.createCustomer(input);
    return customer;
  }
}
