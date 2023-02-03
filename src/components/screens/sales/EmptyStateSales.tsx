import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Variant } from "../../common/Button/Button";

export const EmptyStateSales = () => {
  return (
    <div className="mx-auto flex w-1/3 flex-col items-center justify-center gap-8">
      {/* <Image
        width="300"
        height="300"
        src={teacherImage}
        alt="no classrooms found"
      /> */}
      <div className="text-2xl">No hay ventas todavia!</div>
    </div>
  );
};
