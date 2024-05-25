import Orders from 'src/modules/orders/domain/entity/order.entity';
import { CreateOrderDTO, OutPutOrder } from './create.order.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CreateOrderUseCase {
  constructor() {}

  async execute(input: CreateOrderDTO): Promise<OutPutOrder> {
    const entity = new Orders(input);
    return entity.getOrder;
  }
}
