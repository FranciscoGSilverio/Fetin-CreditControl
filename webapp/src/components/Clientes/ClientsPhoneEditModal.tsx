import { Modal, Button } from "react-bootstrap";
import { Client } from "../../types/client";
import { Formik, Form, Field } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { openModal } from "../Common/SweetAlerts";
import axios from "axios";
import ButtonWithLoading from "../Common/ButtonWithLoading";

type ClientsPhoneEditModalProps = {
  state: boolean;
  closeModal: () => void;
  client: Client;
};

const ClientsPhoneEditModal = ({
  state,
  closeModal,
  client,
}: ClientsPhoneEditModalProps) => {
  const handleClose = () => closeModal();
  const queryClient = useQueryClient();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { mutate: updatePhoneNumber, isLoading } = useMutation({
    mutationFn: (whatsAppNumber: string) => {
      return axios.patch(`${apiUrl}/clients/${client.clientId}`, {
        whatsAppNumber,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      handleClose();
      openModal(
        true,
        "Telefone atualizado com sucesso!",
        "O telefone do cliente foi atualizado."
      );
    },

    onError: () => {
      openModal(
        false,
        "Erro ao atualizar telefone!",
        "Ocorreu um erro ao atualizar o telefone do cliente, tente novamente."
      );
    },
  });

  return (
    <Modal show={state} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Editar telefone para o(a) cliente: {client?.name}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ whatsAppNumber: client?.whatsAppNumber || "" }}
        onSubmit={(values) => updatePhoneNumber(values.whatsAppNumber)}
      >
        {() => (
          <Form>
            <Modal.Body>
              <div className="d-flex flex-column  px-3">
                <label htmlFor="whatsAppNumber" className="form-label">
                  Telefone
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="whatsAppNumber"
                  name="whatsAppNumber"
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                Cancelar
              </Button>
              <ButtonWithLoading type="submit" isLoading={isLoading}>
                Salvar
              </ButtonWithLoading>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ClientsPhoneEditModal;
