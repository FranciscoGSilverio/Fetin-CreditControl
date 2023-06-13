import { Purchase } from 'src/purchase/entities/purchase.entity';

export class CreateClientDto {
  name: string;
  age: number;
  email: string;
  isPaymentPending: boolean;
  whatsAppNumber: string;
  paymentsPending?: number;
  purchases?: Purchase[];
}
