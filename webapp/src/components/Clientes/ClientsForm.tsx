import { Field, Form, Formik } from "formik";

import ButtonWithLoading from "../Common/ButtonWithLoading";
import { openModal } from "../Common/SweetAlerts";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

type FormClient = {
  name: string;
  age: number;
  email: string;
  whatsAppNumber: string;
  isPaymentPending: boolean;
};

const ClientsForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  const { mutate: createClient, isLoading } = useMutation({
    mutationFn: (client: FormClient) => {
      return axios.post(`${apiUrl}/clients`, client);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      openModal(
        true,
        "Usuário criado com sucesso!",
        "O usuário cadastrado já deve apareceer na tabela de usuários acima"
      );
    },
    onError: () => {
      openModal(
        false,
        "Erro ao criar usuário!",
        "Ocorreu um erro ao criar o usuário, verifique os campos e tente novamente"
      );
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        age: 0,
        email: "",
        whatsAppNumber: "",
        isPaymentPending: false,
      }}
      onSubmit={(values: FormClient, { resetForm }) => {
        createClient(values);
        resetForm();
      }}
    >
      {({ setFieldValue }) => (
        <>
          <Form>
            <div className="d-flex mb-3">
              <div className="d-flex flex-column col-sm-6 px-3">
                <label htmlFor=" name" className="form-label">
                  Nome*
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div className="d-flex flex-column col-sm-6 px-3">
                <label htmlFor="age" className="form-label">
                  Idade
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                />
              </div>
            </div>

            <div className="d-flex">
              <div className="d-flex flex-column col-sm-6 px-3">
                <label htmlFor="email" className="form-label">
                  Endereço de email
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={(event: any) => {
                    const email = event.target.value.toLowerCase();
                    setFieldValue("email", email);
                  }}
                />
              </div>
              <div className="d-flex flex-column col-sm-6 px-3">
                <label htmlFor="whatsAppNumber" className="form-label">
                  Número de WhatsApp*
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="whatsAppNumber"
                  name="whatsAppNumber"
                  required
                />
                <div id="emailHelp" className="form-text">
                  *Número usado somente para contato referente aos prazos das
                  parcelas. Não compartilhamos ou enviamos spam para os números
                  cadastrados.
                </div>
              </div>
            </div>
            <div className="px-3">
              <ButtonWithLoading type="submit" isLoading={isLoading}>
                Criar cliente
              </ButtonWithLoading>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default ClientsForm;
