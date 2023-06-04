import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  purchases: number;

  @Column()
  isPaymentPending: boolean;
}
