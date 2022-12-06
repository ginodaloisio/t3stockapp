import classNames from "classnames";
import { ReactNode } from "react";
import { Header } from "../Header/Header";

export const ContentLayout = ({
  children,
  useContainer = true,
  useHeader = true,
}) => {
  return (
    <>
      {useHeader && <Header />}
      <main
        className={classNames(
          useContainer && "container",
          "mx-auto mt-6 flex flex-col items-center justify-center gap-6 p-4 md:mt-16"
        )}
      >
        {children}
      </main>
      {/* //TODO: add footer */}
    </>
  );
};
