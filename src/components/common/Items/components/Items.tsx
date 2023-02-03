import {
  ArrowsPointingOutIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Images, Post, Prices } from "@prisma/client";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ItemInfoModal } from "./ItemInfoModal";

const Items = ({
  result,
}: {
  result: Post & { images: Images[]; prices: Prices[] };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const imageURL = result?.images[0]?.url;
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };
  const handleConfirmModal = (id: string) => {
    router.push(`/item/${id}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={
          isModalOpen
            ? "group cursor-pointer p-2 transition duration-300 ease-out"
            : "group transform cursor-pointer p-2 transition duration-200 ease-in hover:z-50 sm:hover:scale-105"
        }
      >
        <Image
          layout="responsive"
          src={`${imageURL ?? "https://i.imgur.com/TRWWZzp.jpeg"}`}
          alt={`${result.authorId}`}
          placeholder="blur"
          blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0trSsBwACcgEmfgPGBAAAAABJRU5ErkJggg==`}
          width={1920}
          height={1080}
        />
        <div className="p-2">
          <p className="max-w-md truncate text-gray-600 group-hover:text-gray-400 dark:text-gray-600">
            {result.content}
          </p>
          <h2 className="text-2xl text-gray-800 transition-all duration-100 ease-in-out group-hover:font-bold dark:text-gray-200">
            {result.title}
          </h2>
          <p className="flex items-center text-gray-700 opacity-0 group-hover:opacity-100 dark:text-gray-400">
            {" "}
            {result.type && result.type} - {result.brand && result.brand}
            {"  •  "}
            {/* <ShoppingBagIcon className="mr-1 h-5" /> */}
            {result.amount}
            {!isEmpty(result.prices) ? (
              <>
                {"  •  "}
                <CurrencyDollarIcon className="ml-2 mr-1 h-5" />
                {result?.prices[0]?.price && result.prices[0].price + "-."}
              </>
            ) : null}
          </p>
          <p className="flex items-center text-gray-700 opacity-0 group-hover:opacity-100 dark:text-gray-400">
            {result?.length_! | result?.width! | result?.height! ? (
              <ArrowsPointingOutIcon className="mr-1 h-5" />
            ) : null}
            {result?.length_ && result?.length_ + "cm (L)"}
            {result?.width && " • " + result?.width + "cm (AN)"}
            {result?.height && " • " + result?.height + "cm (AL)"}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <ItemInfoModal
          onCancel={onCancel}
          onComplete={handleConfirmModal}
          isOpen={isModalOpen}
          item={result}
        />
      )}
    </>
  );
};

export default Items;
