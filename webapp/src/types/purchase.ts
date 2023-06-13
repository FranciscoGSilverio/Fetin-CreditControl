export type Purchase = {
    purchaseId: string;
    productName: string;
    price: number;
    quantity: number;
    createdAt: Date;
    isPending: boolean;
    dueDate: Date;
    installments: number;
    clientId: string;
}