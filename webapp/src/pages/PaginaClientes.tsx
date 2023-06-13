import ClientesTable from "../components/Clientes/ClientesTable";
import DefaultCard from "../components/Common/DefaultCard";

import { CardBody, CardTitle } from "reactstrap";

import { useQuery } from "react-query";
import axios from "axios";

const PaginaClientes = () => {

  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    data: clientsData,
    isLoading: clientsLoading,
    isError: clientsError,
  } = useQuery("clients", async () => {
    const { data } = await axios.get(`${apiUrl}/clients`);
    return data;
  });

  return (
    <DefaultCard>
      <CardBody>
        <CardTitle tag="h5" className="pb-3">Clientes</CardTitle>
        <ClientesTable data={clientsData}/>
      </CardBody>
    </DefaultCard>
  );
};

export default PaginaClientes;
