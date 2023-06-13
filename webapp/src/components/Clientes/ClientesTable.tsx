import { Table } from "reactstrap";
import { BsCheck } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { formatDate } from "../../utils/formatDate";

type TableProps = {
  data: any[];
  openModal: (clientId: string) => void;
};

const ClientesTable = ({ data, openModal }: TableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Cliente desde</th>
          <th>Compras efetuadas</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((client) => {
            const { day, month, year } = formatDate(client.createdAt);
            const formatedDate = `${day}/${month}/${year}`;

            return (
              <tr key={client.clientId} style={{ cursor: "pointer" }} onClick={() => openModal(client.clientId)}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{formatedDate}</td>
                <td>{client.purchases.length}</td>
                <td>
                  {client.isPaymentPending ? (
                    <BiErrorCircle size={25} className="text-warning" />
                  ) : (
                    <BsCheck size={25} className="text-success" />
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default ClientesTable;
