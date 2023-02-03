import { Sales } from "@prisma/client";
import { useRouter } from "next/router";
import { Post } from "../../../../prisma/prismaTypes";
import { trpc } from "../../../utils/trpc";
import { Separator } from "../../common/Ui/Separator";

const ReceiptScreen = ({
  receipt,
  soldItem,
}: {
  receipt: Sales;
  soldItem: Post;
}) => {
  return (
    <>
      <h1 className="max-w-lg text-2xl font-medium uppercase italic sm:truncate">
        {soldItem.title} | factura #{receipt.receiptId}
      </h1>
      <p className="max-w-[300px] truncate font-medium underline decoration-sky-500 underline-offset-2 hover:overflow-visible hover:overflow-ellipsis hover:whitespace-normal hover:no-underline">
        Comprador: {receipt.buyer}
      </p>
      <Separator className="w-32" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <p className="max-w-[300px] font-medium">
          Cantidad comprada: {receipt.amount}
        </p>
        <Separator orientation="vertical" className="my-2" />
        <p className="max-w-[300px] font-medium">Precio: {receipt.price}</p>
      </div>
    </>
  );
};

export default ReceiptScreen;
