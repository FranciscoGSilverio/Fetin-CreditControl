import { Purchase } from "./purchase";

export type Client = {
  clientId: string;
  name: string;
  age: number;
  email: string;
  createdAt: Date;
  isPaymentPending: boolean;
  whatsAppNumber: string;
  paymentsPending: number;
  purchases?: Purchase[];
};
