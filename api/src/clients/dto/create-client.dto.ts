import { Purchase } from 'src/purchase/entities/purchase.entity';

export class CreateClientDto {
  name: string;
  age: number;
  email: string;
  createdAt: Date;
  isPaymentPending: boolean;
  purchases?: Purchase[];
}
