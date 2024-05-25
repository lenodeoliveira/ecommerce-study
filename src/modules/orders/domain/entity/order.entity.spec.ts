import Orders, { Method, Status } from './order.entity';

const input = {
  name_order: 'Order test',
  description: 'Desc test',
  installment_number: 1,
  payment_method: Method.CARD,
  total_value: 1,
  pay_value: 1,
  status: Status.AWAIT_PAYMENT,
  id_client: 1,
  id_product: [1],
  id_cupom: 1,
};

describe('Order entity', () => {
  it('Should create order entity', () => {
    const orderEntity = new Orders(input);
    expect(orderEntity.getOrder).toEqual({
      name_order: 'Order test',
      description: 'Desc test',
      installment_number: 1,
      payment_method: 'CARTAO',
      total_value: 1,
      pay_value: 1,
      status: 'AGUARDANDO_PAGAMENTO',
      id_client: 1,
      id_product: [1],
      id_cupom: 1,
    });
  });
});
