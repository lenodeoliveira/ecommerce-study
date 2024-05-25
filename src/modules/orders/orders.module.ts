import { Module } from '@nestjs/common';
import CreateOrderUseCase from './application/usecase/order/create/create.order.usecase';
import { OrdersController } from './intra/controllers/orders.controller';
import { OrderRepository } from './intra/repository/Order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../shared/infra/typeorm/entities/customer.entity';
import { Coupon } from '../../shared/infra/typeorm/entities/coupon.entity';
import { Orders } from '../../shared/infra/typeorm/entities/order.entity';
import { FindAllOrdersUseCase } from './application/usecase/order/findAllOrders/find.all.orders.usecase';
import { Products } from '../../shared/infra/typeorm/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Coupon, Orders, Products])],
  controllers: [OrdersController],
  providers: [
    CreateOrderUseCase,
    FindAllOrdersUseCase,
    {
      provide: 'IRepositoryOrders',
      useClass: OrderRepository,
    },
  ],
  exports: [
    {
      provide: 'IRepositoryOrders',
      useClass: OrderRepository,
    },
  ],
})
export class OrdersModule {}
