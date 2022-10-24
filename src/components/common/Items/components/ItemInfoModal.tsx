import { Post } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button, ButtonVariant } from "../../Button/Button";
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
  item: Post;
}) => {
  const onConfirm = () => {
    onComplete(item.id);
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title={item.title}
      description={item.content}
      isOpen={isOpen}
      handleCancel={handleCancel}
    >
      <Image
        layout="responsive"
        src={`${item.image}`}
        alt={`${item.authorId}`}
        placeholder="blur"
        blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0trSsBwACcgEmfgPGBAAAAABJRU5ErkJggg==`}
        width={1920}
        height={1080}
      />
      <ModalActions>
        <Button
          variant={ButtonVariant.Secondary}
          onClick={handleCancel}
          type="button"
        >
          Cerrar
        </Button>
        <Button
          variant={ButtonVariant.Primary}
          onClick={onConfirm}
          type="button"
        >
          Mas información
        </Button>
      </ModalActions>
    </Modal>
  );
};
