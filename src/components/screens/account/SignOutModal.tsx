import { Button, Variant } from "../../common/Button/Button";
import { Modal, ModalActions } from "../../common/Modal";

export const SignOutModal = ({
  onCancel,
  onComplete,
  isOpen,
}: {
  onCancel: () => void;
  onComplete: () => void;
  isOpen: boolean;
}) => {
  const onConfirm = () => {
    onComplete();
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title="Cerrar sesión"
      description="Estás seguro que deseas cerrar tu sesión?"
      isOpen={isOpen}
      handleCancel={handleCancel}
    >
      <ModalActions>
        <Button
          variant={Variant.Secondary}
          onClick={handleCancel}
          type="button"
        >
          Cancelar
        </Button>
        <Button variant={Variant.Danger} onClick={onConfirm} type="button">
          Cerrar
        </Button>
      </ModalActions>
    </Modal>
  );
};
