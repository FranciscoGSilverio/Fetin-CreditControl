import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { formatDate } from "../../utils/formatDate";

import { Purchase } from "../../types/purchase";
import { Formik, Form, Field } from "formik";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { openModal as openResultModal } from "../Common/SweetAlerts";
import ButtonWithLoading from "../Common/ButtonWithLoading";

type UpdateDebtValueProps = {
  state: boolean;
  closeModal: () => void;
  purchase: Purchase;
};

type UpdateDebtValueMutation = {
  purchaseId: string;
  value: number | null;
};

const DashboardUpdateDebtValueModal = ({
  state,
  closeModal,
  purchase,
}: UpdateDebtValueProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const totalPurchaseValue = purchase?.price * purchase?.quantity;

  const {
    day: createdAtDay,
    month: createdAtMonth,
    year: createdAtYear,
    hours: createdAtHours,
    minutes: createdAtMinutes,
    seconds: createdAtSeconds,
  } = formatDate(purchase?.createdAt);

  const formattedCreatedAtDate = `${createdAtDay}/${createdAtMonth}/${createdAtYear} às ${createdAtHours}:${createdAtMinutes}:${createdAtSeconds}`;

  const {
    day: dueDateDay,
    month: dueDateMonth,
    year: dueDateYear,
  } = formatDate(purchase?.dueDate);

  const formattedDueDate = `${dueDateDay}/${dueDateMonth}/${dueDateYear}`;

  const handleClose = () => closeModal();

  const queryClient = useQueryClient();

  const { mutate: updateDebtValue, isLoading } = useMutation({
    mutationFn: ({ purchaseId, value }: UpdateDebtValueMutation) =>
      axios.put(`${apiUrl}/purchase/updateDebtValue/${purchaseId}/${value}`),
    onSuccess: () => {
      queryClient.invalidateQueries("dashboard");
      queryClient.invalidateQueries("pendingPurchases");

      handleClose();
      openResultModal(
        true,
        "Valor da dívida foi atualizado com sucesso!",
        `Pagamento confirmado pelo vendendor`
      );
    },
    onError: () => {
      openResultModal(
        false,
        "Ops!",
        "Algo deu errado ao atualizar o valor da dívida, tente novamente mais tarde ou contate o suporte"
      );
    },
  });

  return (
    <Modal show={state} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Atualização do valor da dívida</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          purchaseId: purchase?.purchaseId,
          totalValue: `R$ ${totalPurchaseValue || 0}`,
          debtValue: `R$ ${purchase?.debtValue}`,
          createdAt: formattedCreatedAtDate,
          dueDate: formattedDueDate,
          discountValue: null,
        }}
        onSubmit={(values) =>
          updateDebtValue({
            purchaseId: values.purchaseId,
            value: values.discountValue,
          })
        }
      >
        {() => (
          <Form>
            <Modal.Body>
              <div className="d-flex flex-column px-3 mb-3">
                <label htmlFor="purchaseId" className="form-label">
                  Id da compra
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="purchaseId"
                  name="purchaseId"
                  disabled
                />
              </div>

              <div className="d-flex mb-2">
                <div className="d-flex flex-column col-sm-6 px-3">
                  <label htmlFor="totalValue" className="form-label">
                    Valor total
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="totalValue"
                    name="totalValue"
                    disabled
                  />
                </div>
                <div className="d-flex flex-column col-sm-6 px-3">
                  <label htmlFor="debtValue" className="form-label">
                    Valor pendente
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="debtValue"
                    name="debtValue"
                    disabled
                  />
                </div>
              </div>

              <div className="d-flex">
                <div className="d-flex flex-column col-sm-6 px-3">
                  <label htmlFor="createdAt" className="form-label">
                    Data da compra
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="createdAt"
                    name="createdAt"
                    disabled
                  />
                </div>
                <div className="d-flex flex-column col-sm-6 px-3">
                  <label htmlFor="dueDate" className="form-label">
                    Data do vencimento
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    disabled
                  />
                </div>
              </div>

              <div className="border w-75 mx-auto mt-4 mb-3" />

              <div className="d-flex flex-column px-3 mb-3">
                <label htmlFor="discountValue" className="form-label">
                  Valor a ser descontado*
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="discountValue"
                  name="discountValue"
                  placeholder="R$"
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <ButtonWithLoading type="submit" isLoading={isLoading}>
                Atualizar
              </ButtonWithLoading>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default DashboardUpdateDebtValueModal;
