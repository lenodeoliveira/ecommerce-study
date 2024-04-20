import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CustomerDTO } from '../../../dto/customer.dto';
import { CreateCustomerUseCase } from 'src/modules/customers/usecases/createCustomer/create.customer.usecase';
import { FindCustomerByEmailUseCase } from 'src/modules/customers/usecases/findCustomerByEmail/find.customer.by.email.usecase';
import { CustomerOutPutDTO } from 'src/modules/customers/dto/customer.output.dto';
@ApiTags('Customers')
@Controller('/customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findCustomerByEmailUseCase: FindCustomerByEmailUseCase,
  ) {}
  @Post('/')
  @ApiProperty({
    type: CustomerDTO,
    required: true,
    description: 'add a customer',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer created',
    type: CustomerOutPutDTO,
  })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 400, description: 'Bad Requests' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  public async createCustomer(
    @Body() createCustomerDto: CustomerDTO,
  ): Promise<CustomerOutPutDTO> {
    return this.createCustomerUseCase.exec(createCustomerDto);
  }

  @Get('/email')
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Find a customer',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer',
    type: CustomerOutPutDTO,
  })
  public async findCustomer(
    @Query('email') email: string,
  ): Promise<CustomerOutPutDTO> {
    const customer = await this.findCustomerByEmailUseCase.exec(email);
    return customer;
  }
}
