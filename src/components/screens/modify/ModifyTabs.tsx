import classNames from "classnames";
import React from "react";
import { atom, useAtom } from "jotai";
import { DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export enum TabName {
  Contenido,
  Imagenes,
}

export const tabAtom = atom<TabName>(TabName.Contenido);

const Links = [
  {
    name: "Contenido",
    tab: TabName.Contenido,
    icon: <DocumentTextIcon className="mb-1 h-8" />,
  },
  {
    name: "Imagenes",
    tab: TabName.Imagenes,
    icon: <PhotoIcon className="mb-1 h-8" />,
  },
];
export const TopNavigation = () => {
  const [selectedTab, setSelectedTab] = useAtom(tabAtom);
  const session = useSession();

  if (!session.data) return null;

  return (
    <div className="overflow-y-auto py-4 px-3">
      <ul className="grid grid-cols-2 gap-4">
        {Links.map((link) => (
          <li key={link.name} onClick={() => setSelectedTab(link.tab)}>
            <a
              href="#"
              className={classNames(
                "flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-100 dark:hover:bg-gray-700",
                link.tab === selectedTab
                  ? "text-blue-700 dark:text-blue-300 hover:dark:text-blue-200"
                  : "text-gray-900 dark:text-white"
              )}
            >
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};