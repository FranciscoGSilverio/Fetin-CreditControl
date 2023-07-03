import { Table } from "reactstrap";

import { BsCheck, BsFillTrashFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";

import { formatDate } from "../../utils/formatDate";
import { Purchase } from "../../types/purchase";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { openModal as openResultModal } from "../Common/SweetAlerts";

type TableProps = {
  data: Purchase[];
};

const DashboardPurchasesTable = ({ data }: TableProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const queryClient = useQueryClient();

  // const { mutate: deleteClient } = useMutation({
  //   mutationFn: (clientId: string) =>
  //     axios.delete(`${apiUrl}/clients/${clientId}`),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("clients");
  //     openResultModal(
  //       true,
  //       "Usuário deletado com sucesso!",
  //       "O usuário foi deletado com sucesso"
  //     );
  //   },
  //   onError: () => {
  //     openResultModal(
  //       false,
  //       "Erro ao deletar usuário!",
  //       "Algo deu errado ao deletar o usuário, tente novamente mais tarde ou contate o suporte"
  //     );
  //   },
  // });

  return (
    <Table className="text-center" striped>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Data da compra</th>
          <th>Data do último pagamento</th>
          <th>Valor pendente</th>
          <th>Cliente</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((purchase) => {
            const { day, month, year } = formatDate(purchase.createdAt);
            const {
              day: latestPaymentDay,
              month: latestPaymentMonth,
              year: latestPaymentYear,
            } = formatDate(purchase.latestPaymentDate);

            const formatedBuyDate = `${day}/${month}/${year}`;
            const formatedLatestPaymentDate = `${latestPaymentDay}/${latestPaymentMonth}/${latestPaymentYear}`;

            return (
              <tr
                key={purchase.purchaseId}
                style={{ cursor: "pointer" }}
                // onClick={() => openModal(client.clientId)}
              >
                <td>{purchase.productName}</td>
                <td>{purchase.price}</td>
                <td>{purchase.quantity}</td>
                <td>{formatedBuyDate}</td>
                <td>{formatedLatestPaymentDate}</td>
                <td>{purchase.debtValue}</td>
                <td>--</td>
                <td>
                  <BsFillTrashFill
                    size={22}
                    className="text-danger mx-1"
                    // onClick={(event: React.MouseEvent<HTMLElement>) => {
                    //   event.stopPropagation();
                    //   deleteClient(client.clientId);
                    // }}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default DashboardPurchasesTable;
