import { Inject, Injectable } from '@nestjs/common';
import { IUsecase } from 'src/shared/protocols/usecase/IUsecase';
import { ICustomerRepository } from 'src/modules/customers/infra/typeorm/interface/customers/ICustomers';
import { CustomerOutPut } from './customer.types';

@Injectable()
export class FindCustomerByEmailUseCase implements IUsecase {
  constructor(
    @Inject('CustomerRepositoryDB')
    private readonly customerRepository: ICustomerRepository,
  ) {}
  public async exec(email: string): Promise<CustomerOutPut> {
    const customer = await this.customerRepository.findByEmail(email);
    return customer;
  }
}
