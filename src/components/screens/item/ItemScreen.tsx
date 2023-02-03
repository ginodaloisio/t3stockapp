import Image from "next/image";
import { useRouter } from "next/router";
import { Post } from "../../../../prisma/prismaTypes";
import { capitalizeFirstLetter } from "../../../utils/useCapitalizeFirstLetter";
import { Button, Variant } from "../../common/Button/Button";
import { Card } from "../../common/Card";
import { ContentLayout } from "../../common/Layouts/ContentLayout";
import { AspectRatio } from "../../common/Ui/AspectRatio";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../common/Ui/HoverCard";
import { Separator } from "../../common/Ui/Separator";

const ItemScreen = ({
  item,
  showButtons = true,
}: {
  item: Post;
  showButtons?: boolean;
}) => {
  //TODO: calcular el porcentaje de descuento en efectivo y hacerlo una variable global que se pueda editar

  const router = useRouter();
  const imageURL = item?.images[0]?.url;
  const handleEditButton = () => {
    router.push(`/modify?id=${item.id}`);
  };
  const handleReturnButton = () => {
    router.push(`/`);
  };
  const handleRegisterSale = () => {
    router.push(`/sale?id=${item.id}`);
  };
  return (
    <>
      <h1 className="text-2xl font-medium uppercase italic">{item.title}</h1>
      <div className="w-[300px] rounded-lg sm:w-[450px]">
        <AspectRatio ratio={16 / 9}>
          {imageURL ? (
            <Image
              src={imageURL}
              alt="Photo by Alvaro Pinot"
              layout="fill"
              className="rounded-md object-cover"
            />
          ) : null}
        </AspectRatio>
      </div>
      <p className="max-w-[300px] truncate font-medium underline decoration-sky-500 underline-offset-2 hover:overflow-visible hover:overflow-ellipsis hover:whitespace-normal hover:no-underline">
        {item.content}
      </p>
      <Separator className="w-32" />
      <p className="max-w-[300px] font-medium">
        Cantidad disponible: {item.amount}
      </p>
      <Separator className="w-32" />
      <p className="font-medium">
        Precio de lista:{" "}
        <HoverCard>
          <HoverCardTrigger className="underline decoration-sky-500 underline-offset-2">
            ${item.prices[0]?.price}
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <p className="text-sm">
                Precio en efectivo (-x%): {item.prices[0]?.price}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </p>
      {showButtons ? (
        <div className="flex flex-row gap-4">
          <Button variant={Variant.Danger} onClick={handleReturnButton}>
            Volver
          </Button>
          <Button variant={Variant.Secondary} onClick={handleEditButton}>
            Editar
          </Button>
          <Button variant={Variant.Primary} onClick={handleRegisterSale}>
            Vender
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default ItemScreen;
