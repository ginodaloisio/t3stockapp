import classNames from "classnames";
import { ReactNode } from "react";
import { Header } from "../Header/Header";

export const ContentLayout = ({
  children,
  useContainer = true,
}: {
  children: ReactNode;
  useContainer: boolean;
}) => {
  return (
    <>
      <Header />
      <main
        className={classNames(
          useContainer && "container",
          "mx-auto mt-6 flex flex-col items-center justify-center gap-6 p-4 md:mt-32"
        )}
      >
        {children}
      </main>
      {/* //TODO: add footer */}
    </>
  );
};
