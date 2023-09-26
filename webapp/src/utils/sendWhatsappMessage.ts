import { Client } from "../types/client";

export const sendWhatsappMessage = (number: string, client: Client) => {
  let suggestedMessage = `Olá, ${client.name}! 👋%0A`;

  const isClientPending = client.purchases?.some(
    (purchase) => purchase.isPending
  );

  const isCliendPastDue = client.purchases?.some(
    (purchase) => purchase.isPending && new Date(purchase.dueDate) < new Date()
  );

  if (isCliendPastDue) {
    const pastDues = client.purchases?.filter(
      (pruchase) =>
        pruchase.isPending && new Date(pruchase.dueDate) < new Date()
    );

    suggestedMessage += `%0A Você possui ${pastDues?.length} pagamento(s) em atraso.`;
    pastDues?.map((purchase) => {
      suggestedMessage += `%0A 📦 - ${
        purchase.productName
      } no valor de R$ ${purchase.price.toFixed(2)}`;
    });
    suggestedMessage +=
      "%0A%0A Por favor, entre em contato conosco para regularizar sua situação. 😊";
  }

  if (isClientPending && !isCliendPastDue) {
    const pendingPurchases = client.purchases?.filter(
      (purchase) => purchase.isPending
    );

    suggestedMessage += `%0A Você possui ${pendingPurchases?.length} pagamento(s) pendente(s).`;
    pendingPurchases?.map((purchase) => {
      suggestedMessage += `%0A 📦 - ${
        purchase.productName
      } no valor de R$ ${purchase.price.toFixed(2)}`;
    });

    suggestedMessage +=
      "%0A%0A Por favor, entre em contato conosco para regularizar sua situação. 😊";
  }

  const url = `https://web.whatsapp.com/send?phone=${number}&text=${suggestedMessage}`;
  window.open(url, "_blank");
};
