export const sendWhatsappMessage = (
  number: string,
  suggestedMessage = "Fetin | Sistema de Controle de Crédito"
) => {
  const url = `https://web.whatsapp.com/send?phone=${number}&text=${suggestedMessage}`;
  window.open(url, "_blank");
};
