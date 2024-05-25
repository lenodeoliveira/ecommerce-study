import Entity from '../../../../shared/entity/entity.abstract';
import NotificationError from '../../../../shared/notification/notification.error';

export enum Method {
  'CARD' = 'CARTAO',
  'PIX' = 'PIX',
}

export enum Status {
  'AWAIT_PAYMENT' = 'AGUARDANDO_PAGAMENTO',
  'PAID' = 'FINALIZADO',
  'RECEIVED' = 'RECEBIDO',
}

type InputProps = {
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

type OutPutOrder = InputProps;

export default class Orders extends Entity {
  private _name_order: string;
  private _description: string;
  private _installment_number: number;
  private _payment_method: Method;
  private _total_value: number;
  private _pay_value: number;
  private _status: Status;
  private _id_client: number;
  private _id_product: number[];
  private _id_cupom?: number;

  constructor(props: InputProps) {
    super();
    this._name_order = props.name_order;
    this._description = props.description;
    this._installment_number = props.installment_number;
    this._status = props.status;
    this._payment_method = props.payment_method;
    this._total_value = props.total_value;
    this._pay_value = props.pay_value;
    this._id_client = props.id_client;
    this._id_product = props.id_product;
    this._id_cupom = props.id_cupom;

    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
  validate(): void {}

  get getOrder(): OutPutOrder {
    return {
      name_order: this._name_order,
      description: this._description,
      installment_number: this._installment_number,
      payment_method: this._payment_method,
      total_value: this._total_value,
      pay_value: this._pay_value,
      status: this._status,
      id_client: this._id_client,
      id_product: this._id_product,
      id_cupom: this._id_cupom,
    };
  }
}
