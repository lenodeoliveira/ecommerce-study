//import Orders from '../../domain/entity/order.entity';

interface IRepositoryOrders {
  //createOrder(order: Orders): Promise<Orders>;
  findAll(): Promise<unknown>;
}

export { IRepositoryOrders };
