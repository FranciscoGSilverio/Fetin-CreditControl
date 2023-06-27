export class CreatePurchaseDto {
  productName: string;
  price: number;
  quantity: number;
  dueDate: Date;
  installments: number;
  clientId: string;
}
