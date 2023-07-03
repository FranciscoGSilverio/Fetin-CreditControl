import { useState } from "react";

import ClientesTable from "../components/Clientes/ClientesTable";
import DefaultCard from "../components/Common/DefaultCard";
import ClientsViewModal from "../components/Clientes/ClientsViewModal";

import { CardBody, CardTitle } from "reactstrap";

import { useQuery } from "react-query";
import axios from "axios";
import ClientsForm from "../components/Clientes/ClientsForm";
import { Client } from "../types/client";

const PaginaClientes = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    data: clientsData,
    // isLoading: clientsLoading,
    // isError: clientsError,
  } = useQuery("clients", async () => {
    const { data } = await axios.get(`${apiUrl}/clients`);
    return data;
  });

  const [clientsView, setClientsView] = useState(false);
  const [currentClientId, setCurrentClientId] = useState("");

  const currentClient = clientsData?.find(
    (client: Client) => client.clientId === currentClientId
  );

  return (
    <>
      <DefaultCard>
        <CardBody>
          <CardTitle tag="h5" className="pb-3">
            Clientes
          </CardTitle>
          <ClientesTable
            data={clientsData}
            openModal={(clientId: string) => {
              setCurrentClientId(clientId);
              setClientsView(true);
            }}
          />
        </CardBody>
      </DefaultCard>
      <ClientsViewModal
        state={clientsView}
        closeModal={() => setClientsView(false)}
        client={currentClient}
      />

      <div className="my-3">
        <DefaultCard>
          <CardBody>
            <CardTitle tag="h5" className="pb-3">
              Adicionar cliente
            </CardTitle>
            <ClientsForm />
          </CardBody>
        </DefaultCard>
      </div>
    </>
  );
};

export default PaginaClientes;
