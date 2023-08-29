import { Formik, Form, Field } from "formik";
import ButtonWithLoading from "../Common/ButtonWithLoading";

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { openModal } from "../Common/SweetAlerts";

import { Client } from "../../types/client";
import { formatDate } from "../../utils/formatDate";

type FormPurchase = {
  productName: string;
  price: number | string;
  quantity: number;
  dueDate: Date | string;
  installments: number;
};

const PurchasesForm = () => {
  //get thirty days from now
  const TODAY = Date.now();
  const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
  const oneMonthFromNow = new Date(TODAY + ONE_MONTH);

  const {
    day: dueDateDay,
    month: dueDateMonth,
    year: dueDateYear,
  } = formatDate(oneMonthFromNow);
  const suggestedDueDate = `${dueDateYear}-${dueDateMonth}-${dueDateDay}`;

  const apiUrl = import.meta.env.VITE_API_URL;

  const queryClient = useQueryClient();

  const { data: clients, isLoading: isClientsLoading } = useQuery(
    "clientsInPurchasesForm",
    async () => {
      const { data } = await axios.get(`${apiUrl}/clients`);
      return data;
    }
  );

  const { refetch: fetchRFIDtag } = useQuery(
    "tagRFID",
    async () => {
      const { data } = await axios.get(`${apiUrl}/firebase`);
      return data;
    },
    { enabled: false, refetchOnWindowFocus: false }
  );

  const { mutate: resetRFIDtag } = useMutation({
    mutationFn: () => {
      return axios.post(`${apiUrl}/firebase`, { Tag: "0" });
    },
  });

  const { mutate: createPurchase, isLoading } = useMutation({
    mutationFn: (purchase: FormPurchase) => {
      return axios.post(`${apiUrl}/purchase`, purchase);
    },
    onSuccess: () => {
      resetRFIDtag();
      queryClient.invalidateQueries("clients");
      openModal(
        true,
        "Compra criada com sucesso!",
        "O registro da compra já foi efetuado para o usuário selecionado"
      );
    },
    onError: () => {
      openModal(
        false,
        "Erro ao criar compra!",
        "Ocorreu um erro ao criar a compra, verifique os campos e tente novamente"
      );
    },
  });

  return (
    <Formik
      initialValues={{
        productName: "",
        clientId: "",
        price: "",
        quantity: 1,
        dueDate: suggestedDueDate,
        installments: 1,
      }}
      onSubmit={(values, { resetForm }) => {
        fetchRFIDtag().then(({ data: tag }) => {
          if (tag?.Tag === '0' || tag === '0') {
            openModal(
              false,
              "Erro ao criar compra!",
              "Tag RFID não detectada, faça a leitura da TAG do cliente usando o leitor RFID e tente novamente"
            );
          } else {
            createPurchase(values);
            resetForm();
          }
        });
      }}
    >
      {() => (
        <Form>
          <div className="d-flex flex-column px-3 mb-3">
            <label htmlFor="productName" className="form-label">
              Produto*
            </label>
            <Field
              type="text"
              className="form-control"
              id="productName"
              name="productName"
              placeholder="Iphone 14 pro..."
            />
          </div>

          <div className="d-flex flex-column px-3 mb-3">
            <label htmlFor="clientId" className="form-label">
              Cliente*
            </label>
            <Field
              as="select"
              className="form-control"
              id="clientId"
              name="clientId"
              placeholder="Iphone 14 pro..."
            >
              <option value="" hidden className="text-muted">
                Selecione um cliente
              </option>
              {!isClientsLoading &&
                clients.map((client: Client) => (
                  <option value={client.clientId} key={client.clientId}>
                    {client.name}
                  </option>
                ))}
            </Field>
          </div>

          <div className="d-flex mb-3">
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor="price" className="form-label">
                Preço
              </label>
              <Field
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="R$"
              />
            </div>
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor="quantity" className="form-label">
                Quantidade
              </label>
              <Field
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
              />
            </div>
          </div>

          <div className="d-flex mb-2">
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor="installments" className="form-label">
                Número de parcelas
              </label>
              <Field
                type="number"
                className="form-control"
                id="installments"
                name="installments"
              />
            </div>
            <div className="d-flex flex-column col-sm-6 px-3">
              <label htmlFor="dueDate" className="form-label">
                Data de vencimento
              </label>
              <Field
                type="date"
                className="form-control"
                id="dueDate"
                name="dueDate"
              />
            </div>
          </div>

          <div className=" px-3 mt-3">
            <ButtonWithLoading isLoading={isLoading} type="submit">
              Criar compra
            </ButtonWithLoading>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PurchasesForm;
