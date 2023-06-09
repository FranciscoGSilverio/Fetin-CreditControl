import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  clientId: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  isPaymentPending: boolean;

  @Column({nullable: true})
  whatsAppNumber: string;

  @Column({nullable: true})
  paymentsPending: number;

  @OneToMany((type) => Purchase, (purchase) => purchase.client, {
    cascade: true,
  })
  purchases?: Purchase[];
}
