import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '../../../../../../shared/infra/typeorm/entities/customer.entity';
import { Address } from '../../../../../../shared/infra/typeorm/entities/address.entity';
import MockDate from 'mockdate';
import { CustomerRepository } from './customers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSQLITETestingModule } from 'src/shared/utils/TypeORMSQLITETestingModule';

MockDate.set('2023-01-01');

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
  created_at: new Date(),
  updated_at: new Date(),
};

describe('CreateCustomerUseCase', () => {
  let repository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([Customer, Address]),
      ],
      providers: [CustomerRepository],
    }).compile();
    repository = module.get<CustomerRepository>(CustomerRepository);
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call CustomerRepository with the corrects values', async () => {
    const inputSpy = jest.spyOn(repository, 'createCustomer');
    await repository.createCustomer(input);
    expect(inputSpy).toHaveBeenCalledWith(input);
  });

  test('Should call CustomerRepository with the correct value', async () => {
    const searchByEmailSpy = jest.spyOn(repository, 'findByEmail');
    await repository.findByEmail(input?.email);
    expect(searchByEmailSpy).toHaveBeenCalledWith('johnDoe@mail.com');
  });

  it('Should create a new customer', async () => {
    const output = await repository.createCustomer(input);
    expect(output.email).toBe(outputCustomer.email);
  });
  it('Should bring the user by email', async () => {
    await repository.createCustomer(input);

    const output = await repository.findByEmail(input.email);
    expect(output.name).toBe(outputCustomer.name);
    expect(output.email).toBe(outputCustomer.email);
    expect(output.document).toBe(outputCustomer.document);
  });

  it('Should bring the user by email', async () => {
    await repository.createCustomer(input);

    const output = await repository.findByEmail(input.email);
    expect(output.name).toBe(outputCustomer.name);
    expect(output.email).toBe(outputCustomer.email);
    expect(output.document).toBe(outputCustomer.document);
  });
  it('Should return null if the user does not exist', async () => {
    await repository.createCustomer(input);
    const output = await repository.findByEmail('test@test.com.br');
    expect(output).toBeNull();
  });
});
