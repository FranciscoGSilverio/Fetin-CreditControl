export type Purchase = {
    pruchaseId: string;
    productName: string;
    price: number;
    quantity: number;
    createdAt: Date;
    isPending: boolean;
    clientId: string;
}