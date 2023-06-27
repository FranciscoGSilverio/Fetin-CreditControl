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

  @Column({nullable: true})
  createdAt: Date;

  @Column()
  isPending: boolean;

  @Column({nullable: true})
  dueDate: Date;

  @Column({nullable: true})
  installments: number;

  @Column({nullable: true})
  latestPaymentDate: Date;
  
  @Column()
  clientId: string;

  @ManyToOne((type) => Client, (client) => client.purchases)
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
