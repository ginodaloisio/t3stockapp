import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import { AddPriceForm } from "../AddPriceForm";

export const useAddPrice = () => {
  const router = useRouter();
  const addPriceMutation = trpc.useMutation("price.addPrice");
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
