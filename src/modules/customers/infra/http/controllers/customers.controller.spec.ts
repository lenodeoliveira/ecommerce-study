import { TypeOrmSQLITETestingModule } from 'src/shared/utils/TypeORMSQLITETestingModule';
import { CustomersModule } from 'src/modules/customers/customer.module';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { Address } from '../../../../../shared/infra/typeorm/entities/address.entity';
import { Customer } from '../../../../../shared/infra/typeorm/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../../typeorm/repositories/customers/customers.repository';

describe('CustomersController', () => {
  let app: INestApplication;
  let repository: CustomerRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CustomersModule,
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([Customer, Address]),
      ],
      providers: [
        {
          provide: 'CustomerRepositoryDB',
          useClass: CustomerRepository,
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    repository = moduleRef.get<CustomerRepository>('CustomerRepositoryDB');

    await app.init();
  });

  it(`/POST customers`, async () => {
    const body = {
      name: 'Lennon',
      email: 'lenodeoliveira@mail.com',
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
    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(201);

    expect(response.body?.name).toEqual(body.name);
    expect(response.body?.email).toEqual(body.email);
    expect(response.body?.document).toEqual(body.document);
    expect(response.body?.address[0]?.main_address).toEqual(
      body.address.main_address,
    );
  });

  it(`/POST Should return 409 conflict when trying to pass a user with the same email`, async () => {
    const body = {
      name: 'Lennon',
      email: 'lenodeoliveira@mail.com',
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(409);

    expect(res.body).toEqual({
      message: 'Já existe usuário com esse e-mail',
      error: 'Conflict',
      statusCode: 409,
    });
  });

  it(`/POST Should not be able to register a name shorter than 6 letters`, async () => {
    const body = {
      name: 'w',
      email: 'lenodeoliveiratesteste@mail.com',
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: ['name must be longer than or equal to 6 characters'],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have a defined name`, async () => {
    const body = {
      email: 'lenodeoliveiratesteste@mail.com',
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'name should not be null or undefined',
        'name must be longer than or equal to 6 characters',
        'name must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have a defined email`, async () => {
    const body = {
      name: 'John test',
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'email should not be null or undefined',
        'email must be a string',
        'email must be an email',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should be a valid email`, async () => {
    const body = {
      name: 'John test',
      email: 'email_email.com',
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: ['email must be an email'],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have a defined age`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'age should not be null or undefined',
        'age must be an integer number',
      ],

      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have a valid age`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02555554459',
      age: '15',
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: ['age must be an integer number'],

      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have a defined `, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02555554459',
      age: 25,
      genre: 1,
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'genre must be longer than or equal to 1 and shorter than or equal to undefined characters',
        'genre must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should define the document`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      age: 25,
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
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'document should not be null or undefined',
        'document must be longer than or equal to 11 characters',
        'document must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should define the address`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02452555555',
      age: 25,
      genre: 'M',
    };
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: ['address should not be null or undefined'],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have define the street`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02452555555',
      age: 25,
      genre: 'M',
      address: {
        country: 'USA',
        city: 'New York',
        zipcode: '99999999',
        complement: 'Complement test',
        borough: 'brooklyn',
        residential_number: 555,
        main_address: true,
      },
    };
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'address.street should not be null or undefined',
        'address.street must be longer than or equal to 1 characters',
        'address.street must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have define the country`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02452555555',
      age: 25,
      genre: 'M',
      address: {
        street: 'Street test',
        city: 'New York',
        zipcode: '99999999',
        complement: 'Complement test',
        borough: 'brooklyn',
        residential_number: 555,
        main_address: true,
      },
    };
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'address.country should not be null or undefined',
        'address.country must be longer than or equal to 1 characters',
        'address.country must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have define the city`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02452555555',
      age: 25,
      genre: 'M',
      address: {
        country: 'Country test',
        street: 'Street test',
        zipcode: '99999999',
        complement: 'Complement test',
        borough: 'brooklyn',
        residential_number: 555,
        main_address: true,
      },
    };
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'address.city should not be null or undefined',
        'address.city must be longer than or equal to 1 characters',
        'address.city must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have define the zipcode`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02452555555',
      age: 25,
      genre: 'M',
      address: {
        country: 'Country test',
        street: 'Street test',
        city: 'City test',
        complement: 'Complement test',
        borough: 'brooklyn',
        residential_number: 555,
        main_address: true,
      },
    };
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'address.zipcode should not be null or undefined',
        'address.zipcode must be longer than or equal to 8 characters',
        'address.zipcode must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have define the borough`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02452555555',
      age: 25,
      genre: 'M',
      address: {
        country: 'Country test',
        street: 'Street test',
        zipcode: '92999999',
        city: 'City test',
        complement: 'Complement test',
        residential_number: 555,
        main_address: true,
      },
    };
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'address.borough should not be null or undefined',
        'address.borough must be longer than or equal to 3 characters',
        'address.borough must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/POST Should have define the residential_number`, async () => {
    const body = {
      name: 'John test',
      email: 'email@mail.com',
      document: '02452555555',
      age: 25,
      genre: 'M',
      address: {
        country: 'Country test',
        street: 'Street test',
        borough: 'Borough test',
        zipcode: '92999999',
        city: 'City test',
        complement: 'Complement test',
        main_address: true,
      },
    };
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send(body)
      .expect(400);

    expect(res.body).toEqual({
      message: [
        'address.residential_number should not be null or undefined',
        'address.residential_number must not be less than 1',
        'address.residential_number must be an integer number',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it(`/GET customer by e-mail`, async () => {
    const input = {
      name: 'Lennon',
      email: 'lenodeoliveira@mail.com',
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
    await repository.createCustomer(input);
    const response = await request(app.getHttpServer())
      .get('/customers/email?email=lenodeoliveira@mail.com')
      .expect(200);

    expect(response.body?.name).toEqual(input.name);
    expect(response.body?.email).toEqual(input.email);
    expect(response.body?.document).toEqual(input.document);
  });

  afterAll(async () => {
    await app.close();
  });
});
