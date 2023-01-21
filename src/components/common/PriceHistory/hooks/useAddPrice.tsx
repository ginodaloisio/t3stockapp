import { trpc } from "../../../../utils/trpc";
import { AddPriceForm } from "../AddPriceForm";

export const useAddPrice = ({ refreshPrices }: { refreshPrices: Function }) => {
  const addPriceMutation = trpc.price.addPrice.useMutation({
    onSuccess: () => {
      refreshPrices();
    },
  });
  const isLoading = addPriceMutation.isLoading;
  const showError = addPriceMutation.isError;
  const handleAddPriceComplete = async (addPriceData: AddPriceForm) => {
    await addPriceMutation.mutateAsync({
      ...addPriceData,
    });
  };

  return {
    isLoading,
    showError,
    handleAddPriceComplete,
  };
};
