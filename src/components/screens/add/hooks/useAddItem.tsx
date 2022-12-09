import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import { AddForm } from "../AddForm";

export const useAddItem = () => {
  const router = useRouter();
  const addItemMutation = trpc.useMutation("stock.addItem", {
    onSuccess: (data) => {
      router.push(`/item/${data.itemId}`);
    },
  });

  const isLoading = addItemMutation.isLoading;
  const showError = addItemMutation.isError;
  const handleAddItemComplete = async (addItemData: AddForm) => {
    await addItemMutation.mutateAsync({
      ...addItemData,
    });
  };

  return {
    isLoading,
    showError,
    handleAddItemComplete,
  };
};
