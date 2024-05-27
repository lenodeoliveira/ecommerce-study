import { Inject, Injectable } from '@nestjs/common';
import IRepositoryOrders from '../../../gateway/IRepository.orders';

@Injectable()
class FindAllOrdersUseCase {
  constructor(
    @Inject('IRepositoryOrders')
    private readonly ordersRepository: IRepositoryOrders,
  ) {}
  async execute(): Promise<unknown> {
    const orders = await this.ordersRepository.findAll();
    return orders;
  }
}

export { FindAllOrdersUseCase };
