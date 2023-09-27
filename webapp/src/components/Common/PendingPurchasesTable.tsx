import { Table } from "reactstrap";

import { BsFillTrashFill, BsFillCreditCard2BackFill } from "react-icons/bs";
import { RiAlarmWarningLine } from "react-icons/ri";

import { formatDate } from "../../utils/formatDate";
import { Purchase } from "../../types/purchase";

import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { openModal as openResultModal } from "./SweetAlerts";
import { Client } from "../../types/client";

type TableProps = {
  data: Purchase[];
  openModal: (purchaseId: string) => void;
};

const PendingPurchasesTable = ({ data, openModal }: TableProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const queryClient = useQueryClient();

  const { data: clients } = useQuery("clients", async () => {
    const { data } = await axios.get(`${apiUrl}/clients`);

    return data;
  });

  const { mutate: deletePurchase } = useMutation({
    mutationFn: (clientId: string) =>
      axios.delete(`${apiUrl}/purchase/${clientId}`),
    onSuccess: () => {
      queryClient.invalidateQueries("dashboard");
      openResultModal(
        true,
        "Compra deletada com sucesso!",
        "As informações do usuário foram atualizadas com a remoção da compra"
      );
    },
    onError: () => {
      openResultModal(
        false,
        "Erro ao deletar compra!",
        "Algo deu errado ao deletar a compra, tente novamente mais tarde ou contate o suporte"
      );
    },
  });

  return (
    <Table className="text-center" striped>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Data da compra</th>
          <th>Data de vencimento</th>
          <th>Valor pendente</th>
          <th>Cliente</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((purchase) => {
            const currentClient = clients?.find(
              (client: Client) => client.clientId === purchase.clientId
            );

            const { day, month, year } = formatDate(purchase.createdAt);

            const {
              day: dueDay,
              month: dueMonth,
              year: dueYear,
            } = formatDate(purchase.dueDate);

            const formatedBuyDate = `${day}/${month}/${year}`;
            const formatedDueDate = `${dueDay}/${dueMonth}/${dueYear}`;

            const isDue = new Date(purchase.dueDate) < new Date();

            return (
              <tr key={purchase.purchaseId} style={{ cursor: "pointer" }}>
                <td>
                  <span className="d-flex align-items-center">
                    {purchase.productName}
                    {isDue && (
                      <RiAlarmWarningLine
                        size={23}
                        className=" text-danger mx-2 pb-1"
                      />
                    )}
                  </span>
                </td>
                <td>{purchase.price}</td>
                <td>{purchase.quantity}</td>
                <td>{formatedBuyDate}</td>
                <td>{formatedDueDate}</td>
                <td>{purchase.debtValue}</td>
                <td>{currentClient?.name || "--"}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <BsFillCreditCard2BackFill
                      size={20}
                      className="mx-1"
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.stopPropagation();
                        openModal(purchase.purchaseId);
                      }}
                    />
                    <BsFillTrashFill
                      size={20}
                      className="text-danger mx-1"
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.stopPropagation();
                        deletePurchase(purchase.purchaseId);
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default PendingPurchasesTable;
