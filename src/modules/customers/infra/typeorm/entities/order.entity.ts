import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Coupon } from './coupon.entity';
import { Products } from './product.entity';

@Entity('pedidos')
export class Orders {
  @PrimaryGeneratedColumn({ name: 'id_pedido' })
  id: number;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'descricao' })
  description: string;

  @Column({ name: 'numero_parcelamento' })
  number_installments: number;

  @Column({ name: 'metodo_pagamento' })
  payment_method: string;

  @Column({ name: 'valor_total' })
  full_value: number;

  @Column({ name: 'valor_pago' })
  pay_value: number;

  @Column({ name: 'situacao' })
  status: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'id_cliente_fk' })
  customers: Customer;

  @ManyToOne(() => Coupon, (coupon) => coupon.orders)
  @JoinColumn({ name: 'id_cupom_fk' })
  coupons: Coupon;

  @ManyToMany(() => Products)
  @JoinTable()
  products: Products[];

  @CreateDateColumn({ name: 'data_criacao' })
  created_at: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  updated_at: Date;
}
