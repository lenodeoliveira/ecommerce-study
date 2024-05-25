import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Orders } from './order.entity';
import { Address } from './address.entity';

@Entity('clientes')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  id: number;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'document' })
  document: string;

  @Column({ name: 'sexo' })
  genre: string;

  @Column({ name: 'idade' })
  age: number;

  @OneToMany(() => Orders, (orders) => orders.customers)
  orders: Orders[];

  @OneToMany(() => Address, (address) => address.customer)
  address: Address[];

  @CreateDateColumn({ name: 'data_criacao' })
  created_at: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  updated_at: Date;
}
