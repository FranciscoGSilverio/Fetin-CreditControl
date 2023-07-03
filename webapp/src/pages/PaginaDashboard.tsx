import { useQuery } from "react-query";
import axios from "axios";

import DashboardTopCard from "../components/Dashboard/DashboardTopCard";
import DashboardPurchasesTable from "../components/Dashboard/DashboardPurchasesTable";
import DefaultCard from "../components/Common/DefaultCard";

import styled from "styled-components";
import { CardBody, CardTitle } from "reactstrap";
import DashboardNewPurchaseButton from "../components/Dashboard/DashboardNewPurchaseButton";

const DashboardTopCardContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  margin: 0 10px;
`;

const PaginaDashboard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data: dashboardData, isLoading } = useQuery("dashboard", async () => {
    const { data } = await axios.get(`${apiUrl}/dashboard/telemetry`);
    return data;
  });

  if (isLoading || !dashboardData) return <></>;
  return (
    <>
      <div className="d-flex" style={{ height: "150px" }}>
        <DashboardTopCardContainer>
          <DashboardTopCard
            icon={1}
            title={"Pagamentos pendentes"}
            value={dashboardData.totalClientsInDebt}
          />
        </DashboardTopCardContainer>
        <DashboardTopCardContainer>
          <DashboardTopCard
            icon={2}
            title={"Compras efetuadas este mês"}
            value={dashboardData.purchasesCreatedThisMonth}
          />
        </DashboardTopCardContainer>
        <DashboardTopCardContainer>
          <DashboardTopCard
            icon={3}
            title={"Compras pagas este mês"}
            value={dashboardData.purchasesPaidThisMonth}
          />
        </DashboardTopCardContainer>
        <DashboardTopCardContainer>
          <DashboardTopCard
            icon={4}
            title={"Pagamentos atrasados"}
            value={dashboardData.totalPastDues}
          />
        </DashboardTopCardContainer>
      </div>

      <div className="my-3">
        <DefaultCard>
          <CardBody>
            <CardTitle tag="h5" className="pb-3">
              Compras pendentes
            </CardTitle>
          </CardBody>
          <DashboardPurchasesTable data={dashboardData.pendingPurchases} />
        </DefaultCard>
      </div>

      <DashboardNewPurchaseButton />
    </>
  );
};

export default PaginaDashboard;
