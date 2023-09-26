import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FiUser, FiShoppingCart } from "react-icons/fi";
import { MdAttachMoney, MdOutlineDownloadDone } from "react-icons/md";
import { BsCalendar, BsCalendarX, BsWhatsapp } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { RiAlarmWarningLine } from "react-icons/ri";

import DefaultCard from "../Common/DefaultCard";
import { formatDate } from "../../utils/formatDate";
import { sendWhatsappMessage } from "../../utils/sendWhatsappMessage";

import { Client } from "../../types/client";
import { Purchase } from "../../types/purchase";

type ClientsViewModalProps = {
  state: boolean;
  closeModal: () => void;
  client: Client;
};

const ClientsViewModal = ({
  state,
  closeModal,
  client,
}: ClientsViewModalProps) => {
  const formatDates = (date: Date) => {
    const { day, month, year } = formatDate(date);
    return `${day}/${month}/${year}`;
  };

  const handleClose = () => closeModal();

  const isDue = client?.purchases?.some(
    (purchase) => new Date(purchase.dueDate) < new Date() && purchase.isPending
  );

  const clientPaymentStatus = isDue
    ? "Pagamento atrasado"
    : client?.isPaymentPending
    ? "Pagamento pendente"
    : "Nenhum pagamento pendente";

  return (
    <Modal show={state} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Visualização do cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ fontSize: "1.05rem" }}
        >
          <div>
            <FiUser size={30} className="text-muted mx-3" />
            <span>{client?.name || ""}</span>
          </div>

          <div className="d-flex align-items-center">
            {isDue && <RiAlarmWarningLine size={25} className="mx-2 pb-1" />}

            <span className={`${isDue && "fw-bold"}`}>
              {clientPaymentStatus}
            </span>
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-around my-3">
          {client?.purchases?.map((purchase: Purchase) => {
            const duePurchase = new Date(purchase.dueDate) < new Date();

            const paymentStatus = duePurchase
              ? "Atrasado"
              : purchase.isPending
              ? "Pendente"
              : "Pago";

            const formatedPurchaseDate = formatDates(purchase.createdAt);
            const formatedDueDate = formatDates(purchase.dueDate);

            return (
              <div className="my-2" key={purchase.purchaseId}>
                <DefaultCard>
                  <div className="d-flex">
                    <div className="d-flex flex-column justify-content-center">
                      <div className="d-flex align-items-center mb-2">
                        <FiShoppingCart size={25} className="text-muted" />
                        <span className="mx-3">{purchase.productName}</span>
                      </div>

                      <div className="d-flex align-items-center my-2">
                        <MdAttachMoney size={25} className="text-muted" />
                        <span className="mx-3">
                          Valor da compra: {purchase.price} reais
                        </span>
                      </div>

                      <div className="d-flex align-items-center my-2">
                        {duePurchase && (
                          <FaCircle size={10} className="text-danger" />
                        )}

                        <MdOutlineDownloadDone
                          size={25}
                          className="text-muted"
                        />
                        <span className="mx-3">Status: {paymentStatus}</span>
                      </div>
                    </div>

                    <DefaultCard>
                      <div className="d-flex mb-4">
                        <BsCalendar size={25} className="mx-1 text-muted" />
                        <span className="d-flex align-items-center mx-2">
                          Data da compra: {formatedPurchaseDate}
                        </span>
                      </div>
                      <div className="d-flex ">
                        <BsCalendarX size={25} className="mx-1 text-muted" />
                        <span className="d-flex align-items-center mx-2">
                          Data de vencimento: {formatedDueDate}
                        </span>
                      </div>
                    </DefaultCard>
                  </div>
                </DefaultCard>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Fechar
        </Button>
        <Button
          variant="outline-success"
          onClick={() => sendWhatsappMessage(client.whatsAppNumber, client)}
        >
          <div className="d-flex align-items-center">
            <BsWhatsapp style={{ marginRight: "10px" }} size={15} />
            <span>Contatar cliente</span>
          </div>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientsViewModal;
