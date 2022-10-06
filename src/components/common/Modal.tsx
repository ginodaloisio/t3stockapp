import { Dialog } from "@headlessui/react";
import React, { ReactNode } from "react";

export const Modal = ({
  children,
  isOpen,
  title,
  description,
  handleCancel,
}: {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  description: string;
  handleCancel: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-8 dark:bg-gray-800 dark:text-gray-500">
          <Dialog.Title className="text-2xl font-bold dark:text-gray-100">
            {title}
          </Dialog.Title>
          <Dialog.Description className="dark:text-gray-400">
            {description}
          </Dialog.Description>

          <div className="flex flex-col gap-4">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export const ModalActions = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-end gap-4">{children}</div>;
};

export const ModalForm = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <form {...rest} className="flex flex-col gap-4">
      {children}
    </form>
  );
};
