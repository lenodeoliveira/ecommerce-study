import { Method, Status } from './create.order.dto';
import CreateOrderUseCase from './create.order.usecase';

const input = {
  name_order: 'Order test',
  description: 'Desc test',
  installment_number: 1,
  payment_method: Method.CARD,
  total_value: 1,
  pay_value: 1,
  status: Status.AWAIT_PAYMENT,
  id_product: [1],
  id_client: 1,
  id_coupon: 1,
};

describe('CreateOrder Usecase', () => {
  it('Should create order', async () => {
    const createOrderUsecase = new CreateOrderUseCase();
    const order = await createOrderUsecase.execute(input);
    expect(order).toEqual({
      name_order: 'Order test',
      description: 'Desc test',
      installment_number: 1,
      payment_method: Method.CARD,
      total_value: 1,
      pay_value: 1,
      status: Status.AWAIT_PAYMENT,
    });
  });
});
