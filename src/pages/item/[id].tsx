import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ContentLayout } from "../../components/common/Layouts/ContentLayout";
import ItemScreen from "../../components/screens/item/ItemScreen";
import { trpc } from "../../utils/trpc";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) router.push("/");
  }, []);
  const stockItem = trpc.stock.getItem.useQuery({ id: String(id) });
  const result = stockItem.data;

  return (
    <>
      <Head>
        <title>Comodo Stock</title>
        <meta name="description" content="more information about this item" />
      </Head>
      {result && (
        <ContentLayout useContainer={true}>
          <ItemScreen item={result} />
        </ContentLayout>
      )}
    </>
  );
};
export default PostPage;
