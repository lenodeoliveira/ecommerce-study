import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerUseCase } from './create.customer.usecase';
import { Customer } from '../../../../shared/infra/typeorm/entities/customer.entity';
import { CustomerDTO } from '../../dto/customer.dto';
import { ICustomerRepository } from '../../infra/typeorm/interface/customers/ICustomers';
import { ConflictException } from '@nestjs/common';
import { CustomerRepository } from '../../infra/typeorm/repositories/customers/customers.repository';

const input = {
  name: 'John Doe',
  email: 'johnDoe@mail.com',
  age: 21,
  document: '02555554459',
  genre: 'M',
  address: {
    street: 'Street test',
    country: 'USA',
    city: 'New York',
    zipcode: '99999999',
    complement: 'Complement test',
    borough: 'brooklyn',
    residential_number: 555,
    main_address: true,
  },
};

const outputCustomer = {
  id: 1,
  name: 'John Doe',
  email: 'johnDoe@mail.com',
  document: '02555554459',
  genre: 'M',
  age: 21,
  address: [
    {
      id: 1,
      street: 'Street test',
      country: 'USA',
      city: 'New York',
      zipcode: '99999999',
      complement: 'Complement test',
      borough: 'brooklyn',
      residential_number: 555,
      main_address: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
  orders: [],
  created_at: new Date(),
  updated_at: new Date(),
};

class CustomerRepositoryMock implements ICustomerRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createCustomer(_data: CustomerDTO): Promise<Customer> {
    return Promise.resolve(outputCustomer);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByEmail(email: string): Promise<Customer> {
    return Promise.resolve(null);
  }
}

describe('CreateCustomerUseCase', () => {
  let usecase: CreateCustomerUseCase;
  let repository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerUseCase,
        {
          provide: 'CustomerRepositoryDB',
          useClass: CustomerRepositoryMock,
        },
      ],
    }).compile();

    usecase = module.get<CreateCustomerUseCase>(CreateCustomerUseCase);
    repository = module.get<CustomerRepository>('CustomerRepositoryDB');
  });
  it('Should be defined', () => {
    expect(usecase).toBeDefined();
  });

  test('Should call CustomerRepository with the corrects values', async () => {
    const inputSpy = jest.spyOn(repository, 'createCustomer');
    await usecase.exec(input);
    expect(inputSpy).toHaveBeenCalledWith(input);
  });
  it('Should create a new customer', async () => {
    const output = await usecase.exec(input);
    expect(output?.name).toBe(input?.name);
    expect(output?.email).toBe(input?.email);
    expect(output?.document).toBe(input?.document);
    expect(output?.address[0]?.street).toBe(input?.address?.street);
  });
  it('should throw ConflictException if customer already exists', async () => {
    jest
      .spyOn(usecase['customerRepository'], 'findByEmail')
      .mockResolvedValue(outputCustomer);

    await expect(usecase.exec(input)).rejects.toThrow(ConflictException);
  });
});
