import { Images, Post } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button, Variant } from "../../Button/Button";
import { Modal, ModalActions } from "../../Modal";

export const ItemInfoModal = ({
  onCancel,
  onComplete,
  isOpen,
  item,
}: {
  onCancel: () => void;
  onComplete: (id: string) => void;
  isOpen: boolean;
  item: Post & { images: Images[] };
}) => {
  const onConfirm = () => {
    onComplete(item.id);
  };
  const handleCancel = () => {
    onCancel();
  };
  const imageURL = item?.images[0]?.url;
  return (
    <Modal
      title={item.title}
      description={item.content}
      isOpen={isOpen}
      handleCancel={handleCancel}
    >
      <Image
        layout="responsive"
        src={`${imageURL ?? "https://i.imgur.com/TRWWZzp.jpeg"}`}
        alt={`${item.authorId}`}
        placeholder="blur"
        blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0trSsBwACcgEmfgPGBAAAAABJRU5ErkJggg==`}
        width={1920}
        height={1080}
      />
      <ModalActions>
        <Button
          variant={Variant.Secondary}
          onClick={handleCancel}
          type="button"
        >
          Cerrar
        </Button>
        <Button variant={Variant.Primary} onClick={onConfirm} type="button">
          Mas información
        </Button>
      </ModalActions>
    </Modal>
  );
};
