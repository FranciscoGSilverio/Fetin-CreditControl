import { Table } from "reactstrap";

import { BsCheck, BsFillTrashFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { RiAlarmWarningLine } from "react-icons/ri";

import { formatDate } from "../../utils/formatDate";
import { Client } from "../../types/client";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { openModal as openResultModal } from "../Common/SweetAlerts";
import { BsFillTelephonePlusFill } from "react-icons/bs";

type TableProps = {
  data: Client[];
  openModal: (clientId: string) => void;
  openPhoneEditModal: (clientId: string) => void;
};

const ClientesTable = ({ data, openModal, openPhoneEditModal }: TableProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const queryClient = useQueryClient();

  const { mutate: deleteClient } = useMutation({
    mutationFn: (clientId: string) =>
      axios.delete(`${apiUrl}/clients/${clientId}`),
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      openResultModal(
        true,
        "Usuário deletado com sucesso!",
        "O usuário foi deletado com sucesso"
      );
    },
    onError: () => {
      openResultModal(
        false,
        "Erro ao deletar usuário!",
        "Algo deu errado ao deletar o usuário, tente novamente mais tarde ou contate o suporte"
      );
    },
  });

  return (
    <Table className="text-center" striped>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Número de WhatsApp</th>
          <th>Email</th>
          <th>Cliente desde</th>
          <th>Compras efetuadas</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((client) => {
            const isDue = client.purchases?.some(
              (purchase) =>
                new Date(purchase.dueDate) < new Date() && purchase.isPending
            );

            const capitalizedName =
              client.name.charAt(0).toUpperCase() + client.name.slice(1);

            const { day, month, year } = formatDate(client.createdAt);
            const formatedDate = `${day}/${month}/${year}`;

            return (
              <tr
                key={client.clientId}
                style={{ cursor: "pointer" }}
                onClick={() => openModal(client.clientId)}
              >
                <td>{capitalizedName}</td>
                <td>{client.whatsAppNumber}</td>
                <td>{client.email}</td>
                <td>{formatedDate}</td>
                <td>{client.purchases?.length || 0}</td>
                <td>
                  {isDue ? (
                    <RiAlarmWarningLine size={25} className="text-danger" />
                  ) : client.isPaymentPending ? (
                    <BiErrorCircle size={25} className="text-warning mx-1" />
                  ) : (
                    <BsCheck size={25} className="text-success mx-1" />
                  )}
                </td>
                <td>
                  <BsFillTelephonePlusFill
                    size={22}
                    className=" mx-1"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      event.stopPropagation();
                      openPhoneEditModal(client.clientId);
                    }}
                  />
                  <BsFillTrashFill
                    size={22}
                    className="text-danger mx-1"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      event.stopPropagation();
                      deleteClient(client.clientId);
                    }}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default ClientesTable;
