import { ChartBarIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { atom, useAtom } from "jotai";
import { useSession } from "next-auth/react";

export enum TabName {
  Overview,
  Charts,
}

export const tabAtom = atom<TabName>(TabName.Charts);

const Links = [
  {
    name: "Vista general",
    tab: TabName.Overview,
    icon: <ChartBarIcon className="mb-1 h-8" />,
  },
  {
    name: "Graficos",
    tab: TabName.Charts,
    icon: <ChartPieIcon className="mb-1 h-8" />,
  },
];
export const TopNavigation = () => {
  const [selectedTab, setSelectedTab] = useAtom(tabAtom);
  const session = useSession();

  if (!session.data) return null;

  return (
    <div className="overflow-y-auto py-4">
      <ul className="grid grid-cols-2 gap-1 sm:gap-4">
        {Links.map((link) => (
          <li key={link.name} onClick={() => setSelectedTab(link.tab)}>
            <a
              href="#"
              className={classNames(
                "flex items-center rounded-lg p-2 text-sm font-normal hover:bg-gray-100 dark:hover:bg-gray-700 sm:text-base",
                link.tab === selectedTab
                  ? "text-blue-700 dark:text-blue-300 hover:dark:text-blue-200"
                  : "text-gray-900 dark:text-white"
              )}
            >
              {link.icon}
              <span className="ml-1 sm:ml-3">{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
