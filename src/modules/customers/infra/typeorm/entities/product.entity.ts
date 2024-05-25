import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Orders } from './order.entity';

@Entity('produtos')
export class Products {
  @PrimaryGeneratedColumn({ name: 'id_produto' })
  id_product: number;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'descricao' })
  description: string;

  @Column({ name: 'marca' })
  brand: string;

  @Column({ name: 'preco_venda' })
  sale_price: number;

  @Column({ name: 'preco_compra' })
  purchase_price: number;

  @Column({ name: 'disponibilidade' })
  availability: boolean;

  @Column({ name: 'imagem' })
  image: string;

  @Column({ name: 'quantidade' })
  quantity: number;

  @ManyToMany(() => Orders, (order) => order.products)
  orders: Orders;

  @CreateDateColumn({ name: 'data_criacao' })
  created_at: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  updated_at: Date;
}
