import { NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { Header } from "../components/common/Header/Header";
import { HomeScreen } from "../components/screens/home/HomeScreen";
import { authOptions } from "./api/auth/[...nextauth]";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Comodo Stock</title>
        <meta
          name="description"
          content="home page to all the stock items on the website"
        />
      </Head>
      <Header />
      <HomeScreen />
    </>
  );
};

export default HomePage;

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
}
