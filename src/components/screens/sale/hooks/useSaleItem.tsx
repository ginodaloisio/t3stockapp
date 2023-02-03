import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import { SaleForm } from "../components/SaleForm";

export const useSaleItem = (itemPrice?: number) => {
  const router = useRouter();
  const subtractItemMutation = trpc.stock.subtractItem.useMutation();
  const registerSaleMutation = trpc.sale.registerSale.useMutation({
    onSuccess(data) {
      router.push(`/receipt?id=${data.id}`);
    },
  });
  const isLoading =
    subtractItemMutation.isLoading || registerSaleMutation.isLoading;
  const isError = subtractItemMutation.isError || registerSaleMutation.isError;
  const handleSaleItemComplete = async (saleItemData: SaleForm) => {
    await subtractItemMutation.mutateAsync({
      id: saleItemData.itemId,
      amount: saleItemData.amount,
    });
    await registerSaleMutation.mutateAsync({
      ...saleItemData,
      itemPrice: itemPrice ?? 0,
    });
  };

  return {
    isLoading,
    isError,
    handleSaleItemComplete,
  };
};
