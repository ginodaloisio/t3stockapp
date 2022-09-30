import Link from "next/link";
import React from "react";

type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

export const HeaderItem = ({
  Icon,
  title,
  goto,
}: {
  Icon: HeroIcon;
  title: string;
  goto: string;
}) => {
  return (
    <Link href={goto}>
      <div className="group flex w-12 cursor-pointer flex-col items-center sm:w-20">
        <Icon className="mb-1 h-8 group-hover:animate-bounce" />
        <p className="tracking-widest opacity-0 group-hover:opacity-100">
          {title}
        </p>
      </div>
    </Link>
  );
};
