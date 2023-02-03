import Head from "next/head";
import { ContentLayout } from "../components/common/Layouts/ContentLayout";
import SalesScreen from "../components/screens/sales/SalesScreen";

function SalesPage() {
  return (
    <>
      <Head>
        <title>Comodo Stock - Ventas</title>
        <meta
          name="description"
          content="page to all the sales made on the store"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ContentLayout>
        <SalesScreen />
      </ContentLayout>
    </>
  );
}

export default SalesPage;
