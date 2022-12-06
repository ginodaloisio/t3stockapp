import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Variant } from "../components/common/Button/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type RegisterForm = {
  username: string;
  password: string;
};
//TODO: hacer algo con el submit del login
function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {};

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/");
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

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 p-4">
        <h1 className="mb-5 text-5xl font-extrabold leading-normal text-gray-700 dark:text-gray-500 md:text-[5rem]">
          <span className="text-purple-300">Comodo</span> Stock
        </h1>
        <form
          className="flex w-2/3 flex-col gap-4 sm:w-1/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-red-500">Este campo es obligatorio!</span>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-3 block text-base font-medium text-gray-700 dark:text-gray-400"
            >
              Contraseña
            </label>
            <input
              type="text"
              id="password"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md dark:bg-gray-800 dark:text-gray-300"
              {...register("password", { required: true })}
            />

            {errors.password && (
              <span className="text-red-500">Este campo es obligatorio!</span>
            )}
          </div>
          <Button type="submit" variant={Variant.Primary}>
            Iniciar
          </Button>
          <Button
            type="button"
            variant={Variant.Secondary}
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            Iniciar con Github
          </Button>
        </form>
      </main>
    </>
  );
}

export default LoginPage;
