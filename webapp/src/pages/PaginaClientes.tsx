import React from "react";
import ClientesTable from "../components/Clientes/ClientesTable";
import { CardBody, CardTitle } from "reactstrap";
import DefaultCard from "../components/Common/DefaultCard";

const PaginaClientes = () => {
  return (
    <DefaultCard>
      <CardBody>
        <CardTitle tag="h5">Clientes</CardTitle>
        <ClientesTable />
      </CardBody>
    </DefaultCard>
  );
};

export default PaginaClientes;
