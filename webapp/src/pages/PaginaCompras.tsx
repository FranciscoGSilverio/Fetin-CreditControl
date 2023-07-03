import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import { Purchase } from "../types/purchase";

import { CardBody, CardTitle } from "reactstrap";

import DefaultCard from "../components/Common/DefaultCard";
import PendingPurchasesTable from "../components/Common/PendingPurchasesTable";
import PurchasesForm from "../components/Purchases/PurchasesForm";
import DashboardUpdateDebtValueModal from "../components/Dashboard/DashboardUpdateDebtValueModal";

const PaginaCompras = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data: dashboardData, isLoading } = useQuery(
    "pendingPurchases",
    async () => {
      const { data } = await axios.get(`${apiUrl}/dashboard/telemetry`);
      return data;
    }
  );

  const [updateDebtValueModal, setUpdateDebtValueModal] = useState(false);
  const [currentPurchaseId, setCurrentPurchaseId] = useState("");

  const currentPurchase = dashboardData?.pendingPurchases.find(
    (purchase: Purchase) => purchase.purchaseId === currentPurchaseId
  );
  return (
    <>
      <div className="my-3">
        <DefaultCard>
          <CardBody>
            <CardTitle tag="h5" className="pb-3">
              Criar nova compra
            </CardTitle>

            <PurchasesForm />
          </CardBody>
        </DefaultCard>
      </div>

      <div className="my-3">
        <DefaultCard>
          <CardBody>
            <CardTitle tag="h5" className="pb-3">
              Compras pendentes
            </CardTitle>
          </CardBody>

          {!isLoading && (
            <PendingPurchasesTable
              data={dashboardData.pendingPurchases}
              openModal={(purchaseId) => {
                setCurrentPurchaseId(purchaseId);
                setUpdateDebtValueModal(true);
              }}
            />
          )}
        </DefaultCard>
      </div>

      <DashboardUpdateDebtValueModal
        state={updateDebtValueModal}
        closeModal={() => {
          setUpdateDebtValueModal(false);
        }}
        purchase={currentPurchase}
      />
    </>
  );
};

export default PaginaCompras;
