import { Client } from 'src/clients/entities/client.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  purchaseId: string;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  createdAt: Date;

  @Column()
  isPending: boolean;

  @Column()
  clientId: string;

  @ManyToOne((type) => Client, (client) => client.purchases)
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
