import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { SignOutModal } from "./SignOutModal";

const AccountScreen = ({ userData }: { userData: Session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };
  const handleConfirmModal = () => {
    setIsModalOpen(false);
    signOut();
  };
  const userName = userData?.user?.name;
  const userImage = userData?.user?.image;
  const userEmail = userData?.user?.email;
  const userSessionExpiresIn = moment().to(userData?.expires);
  return (
    <>
      <li className="flex max-w-sm cursor-default flex-col gap-4 overflow-hidden rounded bg-gray-300 shadow-xl dark:bg-gray-800 dark:text-gray-500">
        <Image
          height={700}
          width={700}
          className="rounded-t-md"
          src={userImage!}
          alt="profile picture"
        />
        <section className="flex flex-col px-4">
          <label className="text-sm text-gray-500 dark:text-gray-500 md:text-lg">
            Nombre de usuario
          </label>
          <span className="mb-2 cursor-pointer text-lg font-bold text-gray-700 dark:text-gray-100">
            {userName}
          </span>
          <label className="text-sm text-gray-500 dark:text-gray-500 md:text-lg">
            Email
          </label>

          <span className="mb-2 cursor-pointer text-lg font-bold text-gray-700 dark:text-gray-100">
            {userEmail}
          </span>
        </section>
        <footer className="mb-4 grid grid-flow-row-dense grid-cols-3 border border-b-0 border-r-0 border-l-0 border-gray-400 pr-5 pl-5 dark:border-white/20">
          <p className="col-span-2 mt-3 text-sm text-gray-800 dark:text-gray-400 md:text-lg">
            La sesión expira {userSessionExpiresIn}
          </p>
          <button
            onClick={() => handleClick()}
            className="ml-auto mt-3 flex items-center justify-center rounded-full hover:animate-bounce"
          >
            <ArrowLeftOnRectangleIcon className="hr-5 mr-1 h-6 w-6" />
          </button>
        </footer>
      </li>
      {isModalOpen && (
        <SignOutModal
          onCancel={onCancel}
          onComplete={handleConfirmModal}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default AccountScreen;
