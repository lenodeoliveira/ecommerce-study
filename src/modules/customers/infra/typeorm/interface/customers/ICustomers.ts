import { CustomerDTO } from 'src/modules/customers/dto/customer.dto';
import { Customer } from '../../../../../../shared/infra/typeorm/entities/customer.entity';

interface ICustomerRepository {
  createCustomer(data: CustomerDTO): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  // findCustomerByEmail(email: string): Promise<Customer>;
  // findCustomerById(id: number): Promise<Customer>;
  // findAll(): Promise<Customer[]>;
}

export { ICustomerRepository };
