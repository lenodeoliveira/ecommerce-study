import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiResponse } from '@nestjs/swagger';
import CreateOrderUseCase from '../../application/usecase/order/create/create.order.usecase';
import { CreateOrderValidationDTO } from '../validation/create.orders.validation.dto';
import { FindAllOrdersUseCase } from '../../application/usecase/order/findAllOrders/find.all.orders.usecase';

@ApiTags('Orders')
@Controller('/order')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
  ) {}
  @Post('/')
  @ApiProperty({
    type: CreateOrderValidationDTO,
    required: true,
    description: 'add a order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order created',
    type: CreateOrderValidationDTO,
  })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 400, description: 'Bad Requests' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  public async createOrder(
    @Body() createOrder: CreateOrderValidationDTO,
  ): Promise<CreateOrderValidationDTO> {
    return this.createOrderUseCase.execute(createOrder);
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Customer',
  })
  public async findAllOrders(): Promise<any> {
    const orders = await this.findAllOrdersUseCase.execute();
    return orders;
  }
}
