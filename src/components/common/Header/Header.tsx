import { useSession } from "next-auth/react";
import { HeaderItem } from "./components/HeaderItem";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  MinusSmallIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ThemeButton from "./components/ThemeButton";

export const Header = () => {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const userMetadata = session.data?.user;

  return (
    <header className="m-5 flex h-auto flex-col items-center justify-between text-gray-700 dark:text-white sm:flex-row">
      <div className="flex max-w-2xl flex-grow justify-evenly">
        <HeaderItem title="INICIO" Icon={HomeIcon} goto="/" />
        <HeaderItem title="BUSCAR" Icon={MagnifyingGlassIcon} goto="/search" />
        <HeaderItem title="AGREGAR" Icon={PlusIcon} goto="/add" />
        <HeaderItem title="REMOVER" Icon={MinusSmallIcon} goto="/delete" />
        <HeaderItem title="CUENTA" Icon={UserIcon} goto="/account" />
        <ThemeButton />
      </div>
      <h1 className="mb-5 text-2xl font-extrabold leading-normal text-gray-700 dark:text-gray-500 md:text-[2rem]">
        <span className="text-purple-300">Comodo</span> Stock
      </h1>
    </header>
  );
};
