import Head from "next/head";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AddScreen from "../components/screens/add/AddScreen";
import { ContentLayout } from "../components/common/Layouts/ContentLayout";

const AddPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);
  return (
    <>
      <Head>
        <title>Comodo Stock</title>
        <meta name="description" content="Generated by create-t3-app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentLayout useContainer={true}>
        {session && <AddScreen authorId={session.user!.id!} />}
      </ContentLayout>
    </>
  );
};

export default AddPage;
