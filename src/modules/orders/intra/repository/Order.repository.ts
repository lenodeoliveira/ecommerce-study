import IRepositoryOrders from '../../application/gateway/IRepository.orders';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from '../../../../shared/infra/typeorm/entities/coupon.entity';
import { Customer } from '../../../../shared/infra/typeorm/entities/customer.entity';
import { Repository } from 'typeorm';
import { Orders } from '../../../../shared/infra/typeorm/entities/order.entity';

class OrderRepository implements IRepositoryOrders {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(entity: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find(id: string): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createOrder(_order: Orders): Promise<Orders> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<unknown[]> {
    const orders = this.ordersRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.customers', 'customers')
      .leftJoinAndSelect('orders.coupons', 'coupons')
      .leftJoinAndSelect('orders.products', 'products')
      .getMany();
    return orders;
  }
}

export { OrderRepository };
