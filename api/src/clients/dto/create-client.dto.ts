export class CreateClientDto {
  name: string;
  age: number;
  email: string;
  createdAt: Date;
  purchases: number;
  isPaymentPending: boolean;
}
