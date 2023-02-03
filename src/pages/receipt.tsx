import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { EmptyStateWrapper } from "../components/common/EmptyStateWrapper";
import { ContentLayout } from "../components/common/Layouts/ContentLayout";
import ReceiptScreen from "../components/screens/receipt/ReceiptScreen";
import SaleScreen from "../components/screens/sale/SaleScreen";
import { trpc } from "../utils/trpc";

function ReceiptPage() {
  const router = useRouter();
  const { status } = useSession();
  const { id } = router.query;
  const { data: receipt, isLoading } = trpc.sale.getSale.useQuery({
    id: String(id),
  });
  const { data: soldItem } = trpc.stock.getItem.useQuery({
    id: receipt?.itemId ?? "1",
  });
  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);
  return (
    <>
      <Head>
        <title>Comodo Stock - Factura #{receipt?.receiptId}</title>
        <meta name="description" content="page to see an specific receipt" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <EmptyStateWrapper
        EmptyComponent={<h1>Error al cargar</h1>}
        NonEmptyComponent={
          receipt &&
          soldItem && (
            <ContentLayout>
              <ReceiptScreen receipt={receipt} soldItem={soldItem} />
            </ContentLayout>
          )
        }
        data={receipt}
        isLoading={isLoading}
      />
    </>
  );
}

export default ReceiptPage;
