import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity('endereco')
export class Address {
  @PrimaryGeneratedColumn({ name: 'id_endereco' })
  id: number;

  @Column({ name: 'cidade' })
  city: string;

  @Column({ name: 'bairro' })
  borough: string;

  @Column({ name: 'pais' })
  country: string;

  @Column({ name: 'cep' })
  zipcode: string;

  @Column({ name: 'numero' })
  residential_number: number;

  @Column({ name: 'rua' })
  street: string;

  @Column({ name: 'endereco_principal' })
  main_address: boolean;

  @Column({ name: 'complemento' })
  complement: string;

  @ManyToOne(() => Customer, (customer) => customer.address)
  @JoinColumn({ name: 'customerId' })
  customer?: Customer;

  @CreateDateColumn({ name: 'data_criacao' })
  created_at: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  updated_at: Date;
}
