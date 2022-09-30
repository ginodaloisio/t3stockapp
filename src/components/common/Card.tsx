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
    <li className="flex max-w-sm cursor-default flex-col gap-4 overflow-hidden rounded bg-gray-50 shadow-lg dark:bg-gray-50 dark:text-black">
      <Image
        height={700}
        width={700}
        objectFit="cover"
        src={imageUrl}
        alt="profile picture"
      />
      <section className="px-4">
        <TitleAs className="mb-2 text-xl font-bold">{title}</TitleAs>
        <p className="text-base text-gray-700 dark:text-black">{body}</p>
      </section>
      <footer className="px-4 pt-4 pb-4">{children}</footer>
    </li>
  );
};
