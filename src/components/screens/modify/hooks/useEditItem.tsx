import { trpc } from "../../../../utils/trpc";

export const useEditItem = ({ itemId }: { itemId: string }) => {
  const editItemMutation = trpc.useMutation("stock.editItem");
  const isLoading = editItemMutation.isLoading;
  const showError = editItemMutation.isError;
  const handleEditItemComplete = async (updatedItemData) => {
    await editItemMutation.mutateAsync({
      ...updatedItemData,
      itemId,
    });
  };

  return {
    isLoading,
    showError,
    handleEditItemComplete,
  };
};
