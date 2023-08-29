import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FiUser, FiShoppingCart } from "react-icons/fi";
import { MdAttachMoney, MdOutlineDownloadDone } from "react-icons/md";
import { BsCalendar, BsCalendarX, BsWhatsapp } from "react-icons/bs";

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
  const handleClose = () => closeModal();

  const clientPaymentStatus = client?.isPaymentPending
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
          <span>{clientPaymentStatus}</span>
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-around my-3">
          {client?.purchases?.map((purchase: Purchase) => {
            const paymentStatus = purchase.isPending ? "Pendente" : "Pago";

            const { day, month, year } = formatDate(purchase.createdAt);
            const formatedPurchaseDate = `${day}/${month}/${year}`;

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
                          Data de vencimento: {formatedPurchaseDate}
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
          onClick={() => sendWhatsappMessage(client.whatsAppNumber)}
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
