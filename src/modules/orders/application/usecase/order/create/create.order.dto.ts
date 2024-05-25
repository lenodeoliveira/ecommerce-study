export enum Method {
  'CARD' = 'CARTAO',
  'PIX' = 'PIX',
}

export enum Status {
  'AWAIT_PAYMENT' = 'AGUARDANDO_PAGAMENTO',
  'PAID' = 'FINALIZADO',
  'RECEIVED' = 'RECEBIDO',
}

export type CreateOrderDTO = {
  name_order: string;
  description: string;
  installment_number: number;
  payment_method: Method;
  total_value: number;
  pay_value: number;
  status: Status;
  id_client: number;
  id_product: number[];
  id_cupom?: number;
};

export type OutPutOrder = CreateOrderDTO;
