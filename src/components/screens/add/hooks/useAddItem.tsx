import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";

export const useAddItem = () => {
  const router = useRouter();
  const addItemMutation = trpc.useMutation("stock.addItem", {
    onSuccess: (data) => {
      router.push(`/item/${data}`);
    },
  });

  const isLoading = addItemMutation.isLoading;
  const showError = addItemMutation.isError;
  const handleAddItemComplete = async (addItemData) => {
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
