import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import { ICustomerRepository } from '../../interface/customers/ICustomers';
import { CustomerDTO } from 'src/modules/customers/dto/customer.dto';
import { Address } from '../../entities/address.entity';

@Injectable()
class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createCustomer(data: CustomerDTO): Promise<Customer> {
    const address =
      data?.address && Object.values(data?.address).length > 0
        ? data?.address
        : null;
    const customer = {
      name: data?.name,
      email: data?.email,
      document: data?.document,
      genre: data?.genre,
      age: data?.age,
      address: [address],
    };

    const customerCreated = await this.customerRepository.save(customer);
    await this.addressRepository.save({
      city: address.city,
      borough: address.borough,
      country: address.country,
      zipcode: address.zipcode,
      residential_number: address.residential_number,
      street: address.street,
      main_address: address.main_address,
      complement: address.complement,
      customer: customer,
    });
    return customerCreated;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.address', 'address')
      .where('customer.email = :email', { email: email })
      .getOne();

    return customer;
  }
}

export { CustomerRepository };
