import { Test, TestingModule } from '@nestjs/testing';
import { FindCustomerByEmailUseCase } from './find.customer.by.email.usecase';
import { CustomerRepository } from '../../infra/typeorm/repositories/customers/customers.repository';
import { Customer } from '../../infra/typeorm/entities/customer.entity';
import { CustomerDTO } from '../../dto/customer.dto';
import { ICustomerRepository } from '../../infra/typeorm/interface/customers/ICustomers';

const input = {
  email: 'johnDoe@mail.com',
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
    return Promise.resolve(outputCustomer);
  }
}

describe('CreateCustomerUseCase', () => {
  let usecase: FindCustomerByEmailUseCase;
  let repository: CustomerRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FindCustomerByEmailUseCase,
        {
          provide: 'CustomerRepositoryDB',
          useClass: CustomerRepositoryMock,
        },
      ],
    }).compile();

    usecase = moduleRef.get<FindCustomerByEmailUseCase>(
      FindCustomerByEmailUseCase,
    );
    repository = moduleRef.get<CustomerRepository>('CustomerRepositoryDB');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(usecase).toBeDefined();
  });

  test('Should call CustomerRepository with the correct value', async () => {
    const searchByEmailSpy = jest.spyOn(repository, 'findByEmail');
    await usecase.exec(input?.email);
    expect(searchByEmailSpy).toHaveBeenCalledWith('johnDoe@mail.com');
  });

  it('Should return a user by email', async () => {
    const customer = await usecase.exec(input?.email);
    expect(customer.id).toBe(outputCustomer.id);
    expect(customer.name).toBe(outputCustomer.name);
    expect(customer.email).toBe(outputCustomer.email);
    expect(customer.age).toBe(outputCustomer.age);
  });

  test('Should return null if there is no client', async () => {
    jest.spyOn(repository, 'findByEmail').mockReturnValueOnce(null);
    const output = await usecase.exec(input?.email);
    expect(output).toBeNull();
  });
});
