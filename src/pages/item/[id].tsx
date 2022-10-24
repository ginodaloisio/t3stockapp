import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ContentLayout } from "../../components/common/Layouts/ContentLayout";
import ItemScreen from "../../components/screens/item/ItemScreen";
import { trpc } from "../../utils/trpc";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const stockItem = trpc.useQuery(["stock.getItem", { id: String(id) || "1" }]);
  const result = stockItem.data;

  return (
    <>
      <Head>
        <title>Comodo Stock</title>
        <meta name="description" content="more information about this item" />
      </Head>
      {result && (
        <ContentLayout useContainer={true}>
          <ItemScreen post={result} />
        </ContentLayout>
      )}
    </>
  );
};
export default PostPage;
