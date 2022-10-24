import Image from "next/image";
import React, { ReactHTML, ReactNode } from "react";

export const Card = ({
  children,
  title,
  body,
  titleAs,
  imageUrl,
}: {
  children: ReactNode;
  title: string;
  body: ReactNode;
  imageUrl: string;
  titleAs?: keyof ReactHTML;
}) => {
  const TitleAs = titleAs ? titleAs : "div";

  return (
    <li className="flex max-w-sm cursor-default flex-col gap-4 overflow-hidden rounded bg-gray-50 shadow-xl dark:bg-gray-800 ">
      <Image
        height={700}
        width={700}
        objectFit="cover"
        src={imageUrl}
        alt="profile picture"
      />
      <section className="px-4">
        <TitleAs className="mb-2 text-xl font-bold text-gray-700 dark:text-gray-100">
          {title}
        </TitleAs>
        <p className="text-base text-gray-700 dark:text-gray-100">{body}</p>
      </section>
      <footer className="px-4 pt-4 pb-4 text-gray-800 dark:text-gray-400">
        {children}
      </footer>
    </li>
  );
};
