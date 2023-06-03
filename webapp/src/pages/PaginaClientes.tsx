import React from "react";
import ClientesTable from "../components/Clientes/ClientesTable";
import { Card, CardBody, CardTitle } from "reactstrap";

const PaginaClientes = () => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Clientes</CardTitle>
          <ClientesTable />
        </CardBody>
      </Card>
    </>
  );
};

export default PaginaClientes;
