import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { EmptyStateWrapper } from "../components/common/EmptyStateWrapper";
import { ContentLayout } from "../components/common/Layouts/ContentLayout";
import SaleScreen from "../components/screens/sale/SaleScreen";
import { trpc } from "../utils/trpc";

function SalePage() {
  const router = useRouter();
  const { status } = useSession();
  const { id } = router.query;
  const stockItem = trpc.stock.getItem.useQuery({ id: String(id) });
  const lastReceiptId = trpc.sale.getLastSale.useQuery();
  const isLoading = stockItem.isLoading || lastReceiptId.isLoading;
  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);
  return (
    <>
      <Head>
        <title>Comodo Stock - Registrar venta</title>
        <meta name="description" content="page to register a new sale" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <EmptyStateWrapper
        EmptyComponent={<h1>Error al cargar</h1>}
        NonEmptyComponent={
          stockItem.data &&
          lastReceiptId.data && (
            <ContentLayout>
              <SaleScreen
                item={stockItem.data}
                lastReceiptId={lastReceiptId.data[0]?.receiptId ?? "0"}
              />
            </ContentLayout>
          )
        }
        data={stockItem.data || lastReceiptId.data}
        isLoading={isLoading}
      />
    </>
  );
}

export default SalePage;
