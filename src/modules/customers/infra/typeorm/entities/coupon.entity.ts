import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Orders } from './order.entity';

@Entity('cupom')
export class Coupon {
  @PrimaryGeneratedColumn({ name: 'id_cupom' })
  id: number;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'descricao' })
  description: string;

  @Column({ name: 'valor' })
  value: number;

  @Column({ name: 'tipo' })
  type_coupon: string;

  @Column({ name: 'data_inicio_vigencia' })
  start_date: Date;

  @Column({ name: 'data_fim_vigencia' })
  end_date: Date;

  @Column({ name: 'disponibilidade' })
  availability: boolean;

  @OneToMany(() => Orders, (orders) => orders.coupons)
  orders: Orders[];

  @CreateDateColumn({ name: 'data_criacao' })
  created_at: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  updated_at: Date;
}
