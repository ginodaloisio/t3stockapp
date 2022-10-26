import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import { UpdateForm } from "../ModifyForm";

export const useEditItem = ({ id }: { id: string }) => {
  const router = useRouter();
  const editItemMutation = trpc.useMutation("stock.editItem", {
    onSuccess: (id) => {
      router.push(`/item/${id}`);
    },
  });
  const isLoading = editItemMutation.isLoading;
  const showError = editItemMutation.isError;
  const handleEditItemComplete = async (updatedItemData: UpdateForm) => {
    await editItemMutation.mutateAsync({
      ...updatedItemData,
      id,
    });
  };

  return {
    isLoading,
    showError,
    handleEditItemComplete,
  };
};
