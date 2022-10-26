import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, ButtonVariant } from "../../common/Button/Button";

export const EmptyStateHomeScreen = () => {
  return (
    <div className="mx-auto flex w-1/3 flex-col items-center justify-center gap-8">
      {/* <Image
        width="300"
        height="300"
        src={teacherImage}
        alt="no classrooms found"
      /> */}
      <div className="text-2xl">No hay items todavia!</div>
      <Link href="/add" passHref>
        <Button as="a" variant={ButtonVariant.Primary}>
          Agregar items
        </Button>
      </Link>
    </div>
  );
};
